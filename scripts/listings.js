// do not remove the dashes above, they are required for babel to work

"use strict";

var PER_PAGE = 6;

$(document).ready(function () {
  DOMBindings();
  paginate($("#properties").children());
});

function DOMBindings() {
  $("#listing-search").click(function () {
    search();
  });

  $("#filters-toggle").click(function () {
    $(".filters-state").toggleClass("open");
  });

  $("#listing-clear-filters").click(function () {
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

  $("#listings-text-search").keydown(function (e) {
    if (e.keyCode === 13) {
      // remove focus if user presses enter
      $(that).blur();
    }

    var $listings = $(".listing-preview");
    $listings.hide();

    var searchContent = $(this).val().toLowerCase();

    var filteredListings = $(".listing-preview").filter(function () {
      return $(this).text().toLowerCase().indexOf(searchContent) > 0 || searchContent === "";
    });
    paginate(filteredListings);
  });
}

function paginate($properties) {
  // cleanup from prior paginations
  $properties.hide();
  $(".pages").children().remove();
  $("#listings-next").off("click");
  $("#listings-prev").off("click");

  var totalPages = Math.ceil($properties.length / PER_PAGE);

  // show page 1
  $properties.slice(0, PER_PAGE).show();

  // create pagination buttons
  for (var pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    var $newPage = $("<a></a>").text(pageNumber).data("page", pageNumber);

    if (pageNumber === 1) {
      $newPage.addClass("selected");
    }

    $(".pages").append($newPage);

    $newPage.click(function () {
      pageClickListener(this);
    });
  }

  function pageClickListener(clickedPage) {
    clearSelected();
    goToPage($(clickedPage).data("page"));
  }

  $("#listings-next").click(function () {
    var pageNext = clearSelected(true) + 1;
    pageNext = pageNext > totalPages ? 1 : pageNext;

    goToPage(pageNext);
  });

  $("#listings-prev").click(function () {
    var pagePrev = clearSelected(true) - 1;

    pagePrev = pagePrev <= 0 ? totalPages : pagePrev;

    goToPage(pagePrev);
  });

  function goToPage(newPage) {
    $properties.hide();
    $(".pages").children().eq(newPage - 1).addClass("selected");

    var start = (newPage - 1) * PER_PAGE;

    $properties.slice(start, start + PER_PAGE).show();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }
}

function search() {
  var listings = $(".listing-preview");
  $(listings).hide();

  var typeFilter = $("#type-filter").find(":selected").val().toLowerCase();
  var locationFilter = $("#location-filter").find(":selected").val().toLowerCase();
  var minSizeFilter = parseInt($("#min-size").val());
  var maxPriceFilter = parseInt($("#max-price").val());

  var filteredListings = $(".listing-preview").filter(function () {
    return ($(this).data("location").toLowerCase() === locationFilter || locationFilter === "n/a") && ($(this).data("lease") === (typeFilter === "lease") || $(this).data("sublease") === (typeFilter === "sublease") || typeFilter === "n/a") && (parseInt($(this).data("size").toString().replace(",", "")) >= minSizeFilter || isNaN(minSizeFilter)) && (parseInt($(this).data("price").toString().replace(",", "")) <= maxPriceFilter || isNaN(maxPriceFilter));
  });

  paginate(filteredListings);
}

function clearSelected(returnCleared) {
  var selectedPage = $(".pages").find(".selected");
  selectedPage.removeClass("selected");

  if (returnCleared) {
    return parseInt(selectedPage.data("page"));
  }
}