const PER_PAGE = 6;

$(document).ready(function() {
  scrollReveal();
  DOMBindings();
  paginate($("#properties").children());
});

function DOMBindings() {
  $("#listing-search").click(function() {
    search();
  });

  $("#filters-toggle").click(function() {
    $(".filters-state").toggleClass("open");
  });

  $("#listing-clear-filters").click(function() {
    var listings = $(".listing-preview");
    $("#listings-text-search").val("");
    $("#location-filter").val("n/a");
    $("#status-filter").val("n/a");
    $("#type-filter").val("n/a");
    $("#min-rooms").val("1");
    $("#min-size").val("");
    $("#max-price").val("");
    paginate(listings);
  });

  $("#listings-text-search").keydown(function(e) {
    if (e.keyCode === 13) {
      // remove focus if user presses enter
      $(that).blur();
    }
    var listings = $(".listing-preview");
    $(listings).hide();

    var searchContent = $(this)
      .val()
      .toLowerCase();

    var filteredListings = $(".listing-preview").filter(function() {
      return (
        $(this)
          .text()
          .toLowerCase()
          .indexOf(searchContent) > 0 || searchContent === ""
      );
    });

    paginate(filteredListings);
  });

  $(".scroll-listings-top").click(function() {
    var top = $(".header").offset().top;

    $("html, body").animate({ scrollTop: top }, 250);
  });
}

function scrollReveal() {
  window.sr = ScrollReveal();
  sr.reveal(".listing-preview");
}

function paginate(properties) {
  var page = 0;
  var totalPages = parseInt(properties.length / PER_PAGE);

  $("#listings-next").off("click");
  $("#listings-prev").off("click");
  $(".pages").html(
    '<a data-page="1" id="page-1" class="scroll-listings-top selected">1</a>'
  );

  $(properties).hide();
  $(properties)
    .slice(page, PER_PAGE)
    .show();

  // create page buttons
  for (var i = 0; i < totalPages; i++) {
    // we start at page 2 because page 1 already exists
    var unit = i + 2;
    var newPage =
      "<a class=scroll-listings-top id=page-" +
      unit +
      " data-page=" +
      unit +
      ">" +
      unit +
      "</a>";
    $(".pages").append(newPage);
    $("#page-" + unit).click(function() {
      pageClickListener(this);
    });
  }

  $("#page-1").click(function() {
    pageClickListener(this);
  });

  function pageClickListener(clickedPage) {
    $(".pages")
      .children()
      .eq(page)
      .removeClass("selected");
    page = $(clickedPage).data("page") - 1;
    paginateHelper(page);
  }

  $(properties).hide();
  $(properties)
    .slice(page, PER_PAGE)
    .show();

  $("#listings-next").click(function() {
    $(".pages")
      .children()
      .eq(page)
      .removeClass("selected");
    page = page === totalPages ? 0 : (page += 1);
    paginateHelper(page);
  });

  $("#listings-prev").click(function() {
    $(".pages")
      .children()
      .eq(page)
      .removeClass("selected");
    page = page === 0 ? totalPages : (page -= 1);
    properties.hide();
    paginateHelper(page);
  });

  function paginateHelper(newPage) {
    properties.hide();
    var start = newPage * PER_PAGE;
    properties.slice(start, start + PER_PAGE).show();
    // highlight the selected page number
    $(".pages")
      .children()
      .eq(newPage)
      .addClass("selected");
  }
}

function search() {
  var listings = $(".listing-preview");
  $(listings).hide();

  var typeFilter = $("#type-filter")
    .find(":selected")
    .val()
    .toLowerCase();
  var locationFilter = $("#location-filter")
    .find(":selected")
    .val()
    .toLowerCase();
  var minSizeFilter = parseInt($("#min-size").val());
  var maxPriceFilter = parseInt($("#max-price").val());

  var filteredListings = $(".listing-preview").filter(function() {
    return (
      ($(this)
        .data("location")
        .toLowerCase() === locationFilter ||
        locationFilter === "n/a") &&
      ($(this).data("lease") === (typeFilter === "lease") ||
        $(this).data("sublease") === (typeFilter === "sublease") ||
        typeFilter === "n/a") &&
      (parseInt(
        $(this)
          .data("size")
          .toString()
          .replace(",", "")
      ) >= minSizeFilter ||
        isNaN(minSizeFilter)) &&
      (parseInt(
        $(this)
          .data("price")
          .toString()
          .replace(",", "")
      ) <= maxPriceFilter ||
        isNaN(maxPriceFilter))
    );
  });

  paginate(filteredListings);
}
