---
---
// do not remove the dashes above, they are required for babel to work

const PER_PAGE = 6

$(document).ready(function() {
  paginate($('#properties').children());

  $("#print-brochure").click(function() {
    window.print();
  })

  $('.scroll-listings-top').click(function() {
    var top = $("#properties").offset().top;

    $('html, body').animate({scrollTop: top}, 250);
  })

  $("#listings-text-search").keydown(function() {
    var listings = $('.listing-preview')
    $(listings).hide();

    var searchContent = $(this).val().toLowerCase();

    var filteredListings = $('.listing-preview').filter(function(preview) {
      return $(this).text().toLowerCase().indexOf(searchContent) > 0 || searchContent === ""
    })

    paginate(filteredListings);
  })

  $("#listing-search").click(function() {
    var listings = $('.listing-preview')
    $(listings).hide();

    var locationFilter = $('#location-filter').find(":selected").val().toLowerCase();
    var statusFilter = $('#status-filter').find(":selected").val().toLowerCase();
    var typeFilter = $('#type-filter').find(":selected").val().toLowerCase();
    var minRoomFilter = parseInt($('#min-rooms').find(":selected").val());
    var minSizeFilter = parseInt($('#min-size').val());
    var maxPriceFilter = parseInt($('#max-price').val());

    var filteredListings = $('.listing-preview').filter(function() {
      return ($(this).data("available").toString() === statusFilter || statusFilter ==="n/a") &&
        ($(this).data("location").toLowerCase() === locationFilter || locationFilter === "n/a") &&
        ($(this).data("type").toLowerCase() === typeFilter || typeFilter === "n/a") &&
        parseInt($(this).data("rooms")) >= minRoomFilter &&
        (parseInt($(this).data("size").toString().replace(",", "")) >= minSizeFilter || isNaN(minSizeFilter)) &&
        (parseInt($(this).data("price").toString().replace(",", "")) <= maxPriceFilter || isNaN(maxPriceFilter))
    });

    paginate(filteredListings);
  })

  $("#listing-clear-filters").click(function() {
    console.info("clicked!");
    var listings = $('.listing-preview');
    $("#listings-text-search").val("");
    $("#location-filter").val("n/a");
    $("#status-filter").val("n/a");
    $("#type-filter").val("n/a");
    $("#min-rooms").val("1");
    $("#min-size").val("");
    $("#max-price").val("");
    paginate(listings);
  })
  $(window).scroll(function() {
    if (window.pageYOffset >= 67) {
      $('#top-nav').hide();
      $('.ham-menu-home').show();
    }
    if (window.pageYOffset < 67) {
      $('#top-nav').show();
      $('.ham-menu-home').hide();
    }
  })
  $("#features-toggle").click(function() {
    $('#show-more-filters').toggle();
    $('#show-less-filters').toggle();
    $(".filters").toggle();
    if ($(this).hasClass("plus-sign")) {
      $(this).removeClass("plus-sign")
      $(this).addClass("minus-sign")
    } else {
      $(this).removeClass("minus-sign")
      $(this).addClass("plus-sign")
    }
  })
  $(".scroll-arrow").click(function() {
    window.scrollTo(0, $('#header-home').height());
  });

  $('.contact-close').click(function() {
    $('.contact-us-modal').fadeToggle();
  });

  $('.contact-us-link').click(function() {
    $('.contact-us-modal').fadeIn();
    $('.nav-modal').fadeOut();
  });

  $('.ham-menu, .menu-close').click(function(){
    $('.nav-modal').fadeToggle();
  });

  $('.close-agent-detail').click(function() {
    $('.agent-details').fadeOut();
    $('.main').removeClass('mobile-bg-hide');
  })

  $('.bio-button').click(function() {
    let agent = $(this).data('agent');
    $("#agent-" + agent).fadeIn();
    $('.main').addClass('mobile-bg-hide');
  })

  function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
})

function paginate(properties) {
  var page = 0;
  var totalPages = parseInt(properties.length / PER_PAGE)

  $("#listings-next").off("click");
  $("#listings-prev").off("click");
  $('.pages').html('<a data-page="1" id="page-1" class="scroll-listings-top selected">1</a>')

  $(properties).hide();
  $(properties).slice(page, PER_PAGE).show();

  // create page buttons
  for(var i=0; i < totalPages; i++){
    // we start at page 2 because page 1 already exists
    var unit = i + 2;
    var newPage = "<a class=scroll-listings-top id=page-" + unit + " data-page=" + unit + ">" + unit + "</a>"
    $(".pages").append(newPage);
    $("#page-" + unit).click(function() {
      pageClickListener(this);
    });
  }

  $("#page-1").click(function() {
    pageClickListener(this)
  })

  function pageClickListener(clickedPage) {
    $(".pages").children().eq(page).removeClass("selected");
    page = $(clickedPage).data("page") - 1;
    paginateHelper(page);
  }

  $(properties).hide();
  $(properties).slice(page, PER_PAGE).show();

  $("#listings-next").click(function() {
    $('.pages').children().eq(page).removeClass('selected');
    page = page === totalPages ? 0 : page += 1;
    paginateHelper(page);
  })

  $("#listings-prev").click(function() {
    $('.pages').children().eq(page).removeClass('selected');
    page = page === 0 ? totalPages : page -= 1;
    properties.hide();
    paginateHelper(page);
  })

  function paginateHelper(newPage) {
    properties.hide();
    var start = newPage * PER_PAGE;
    properties.slice(start, start + PER_PAGE).show()
    // highlight the selected page number
    $('.pages').children().eq(newPage).addClass('selected');
  }
}
