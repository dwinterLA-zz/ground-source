// do not remove the dashes above, they are required for babel to work

'use strict';

var PER_PAGE = 6;
var PASSWORDS = ["keller+groundsource2017"];

$(document).ready(function () {
  if (!compatibleBrowser()) {
    // show labels on ie9 because it doesnt support placeholder text
    $('.contact-labels').show();
  }
  authenticate();
  var modalOffset = 0;
  paginate($('#properties').children());

  $('.to-top').click(function () {
    window.scrollTo(0, 0);
  });
  $("#listings-text-search").keypress(function (e) {
    var that = this;
    if (e.keyCode === 13) {
      $(that).blur();
    }
  });
  $("#print-brochure").click(function () {
    window.print();
  });

  addScrollListener();

  $("#listings-text-search").keydown(function () {
    var listings = $('.listing-preview');
    $(listings).hide();

    var searchContent = $(this).val().toLowerCase();

    var filteredListings = $('.listing-preview').filter(function (preview) {
      return $(this).text().toLowerCase().indexOf(searchContent) > 0 || searchContent === "";
    });

    paginate(filteredListings);
  });

  $("#listing-search").click(function () {
    listingsSearch();
  });

  $("#listing-clear-filters").click(function () {
    var listings = $('.listing-preview');
    $("#listings-text-search").val("");
    $("#location-filter").val("n/a");
    $("#status-filter").val("n/a");
    $("#type-filter").val("n/a");
    $("#min-rooms").val("1");
    $("#min-size").val("");
    $("#max-price").val("");
    paginate(listings);
  });
  $(window).scroll(function () {
    var footerOffset = $('.footer').offset().top;
    var bodyHeight = $('body').height();
    var difference = bodyHeight - footerOffset;
    var footerHeight = $(".footer").outerHeight() + 5;

    if (window.pageYOffset >= 67) {
      $('#top-nav').hide();
      $('.ham-menu-home').show();
    }
    if (window.pageYOffset < 67) {
      $('#top-nav').show();
      $('.ham-menu-home').hide();
    }
  });
  $("#features-toggle").click(function () {
    $('#show-more-filters').toggle();
    $('#show-less-filters').toggle();
    $(".filters").toggle();
    if ($(this).hasClass("plus-sign")) {
      $(this).removeClass("plus-sign");
      $(this).addClass("minus-sign");
    } else {
      $(this).removeClass("minus-sign");
      $(this).addClass("plus-sign");
    }
  });
  $(".scroll-arrow").click(function () {
    window.scrollTo(0, $('#header-home').height());
  });

  $('.contact-close').click(function () {
    $('.main').removeClass('modal-open');
    $('body').removeClass('overflow-hidden');
    $('.contact-us-modal').fadeOut();
    window.scrollTo(0, modalOffset);
  });

  $("#tenant-service-modal-button").click(function () {
    modalOffset = window.pageYOffset;
    $(".main").addClass('modal-open');
    $(".main").addClass('mobile-bg-hide');
    $("#tenant-service-modal").fadeIn();
  });

  $("#investment-service-modal-button").click(function () {
    modalOffset = window.pageYOffset;
    $("#investment-service-modal").fadeIn();
    $(".main").addClass("modal-open");
    $(".main").addClass("mobile-bg-hide");
  });

  $("#landlord-service-modal-button").click(function () {
    modalOffset = window.pageYOffset;
    $("#landlord-service-modal").fadeIn();
    $(".main").addClass("modal-open");
    $('.main').addClass('mobile-bg-hide');
  });

  $('.service-detail-close').click(function () {
    $('.main').removeClass('modal-open');
    $('body').removeClass('overflow-hidden');
    $('.service-detail').fadeOut();
    window.scrollTo(0, modalOffset);
  });

  $('.contact-us-link').click(function () {
    $('.main').addClass('modal-open');
    $('.contact-us-modal').fadeIn();
    $('.nav-modal').fadeOut();
  });

  $('.ham-menu').click(function () {
    modalOffset = window.pageYOffset;
    $('body').addClass('overflow-hidden');
    $('.main').addClass('modal-open');
    $('.nav-modal').fadeIn();
  });

  $('.menu-close').click(function () {
    $('body').removeClass('overflow-hidden');
    $('.main').removeClass('modal-open');
    $('.nav-modal').fadeOut();
    window.scrollTo(0, modalOffset);
  });

  $('.close-agent-detail').click(function () {
    $('.agent-details').fadeOut();
    $('.main').removeClass('mobile-bg-hide');
  });

  $('.bio-button').click(function () {
    var agent = $(this).data('agent');
    $("#agent-" + agent).fadeIn();
    $('.main').addClass('mobile-bg-hide');
  });

  function initMap() {
    var uluru = { lat: -25.363, lng: 131.044 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
});

function paginate(properties) {
  var page = 0;
  var totalPages = parseInt(properties.length / PER_PAGE);

  $("#listings-next").off("click");
  $("#listings-prev").off("click");
  $('.pages').html('<a data-page="1" id="page-1" class="scroll-listings-top selected">1</a>');

  $(properties).hide();
  $(properties).slice(page, PER_PAGE).show();

  // create page buttons
  for (var i = 0; i < totalPages; i++) {
    // we start at page 2 because page 1 already exists
    var unit = i + 2;
    var newPage = "<a class=scroll-listings-top id=page-" + unit + " data-page=" + unit + ">" + unit + "</a>";
    $(".pages").append(newPage);
    $("#page-" + unit).click(function () {
      pageClickListener(this);
    });
  }

  $("#page-1").click(function () {
    pageClickListener(this);
  });

  function pageClickListener(clickedPage) {
    $(".pages").children().eq(page).removeClass("selected");
    page = $(clickedPage).data("page") - 1;
    paginateHelper(page);
  }

  addScrollListener();

  $(properties).hide();
  $(properties).slice(page, PER_PAGE).show();

  $("#listings-next").click(function () {
    $('.pages').children().eq(page).removeClass('selected');
    page = page === totalPages ? 0 : page += 1;
    paginateHelper(page);
  });

  $("#listings-prev").click(function () {
    $('.pages').children().eq(page).removeClass('selected');
    page = page === 0 ? totalPages : page -= 1;
    properties.hide();
    paginateHelper(page);
  });

  function paginateHelper(newPage) {
    properties.hide();
    var start = newPage * PER_PAGE;
    properties.slice(start, start + PER_PAGE).show();
    // highlight the selected page number
    $('.pages').children().eq(newPage).addClass('selected');
  }
}

function addScrollListener() {
  $('.scroll-listings-top').click(function () {
    var top = $(".header").offset().top;

    $('html, body').animate({ scrollTop: top }, 250);
  });
}

function authenticate() {
  $("#dialog").css("opacity", 1);
  var storeCredentials = localStorage.getItem("credentials");

  if (checkCredentials(storeCredentials)) {
    $("#dialog").hide();
    displaySite();
  } else {
    login();
    return;
  }
}

function checkCredentials(credentials) {
  return PASSWORDS.indexOf(credentials) >= 0;
}

function displaySite() {
  $('.main').show();
  $('.review-carousel').slick({
    "autoplay": false,
    "draggable": false,
    "dots": true,
    "prevArrow": $('.navigation-arrow-left'),
    "nextArrow": $('.navigation-arrow-right')
  });
}

function login() {
  $("#dialog").keypress(function (e) {
    if (e.keyCode === 13) {
      $("#dialog").dialog("close");
    }
  });
  $("#dialog").dialog({
    buttons: [{
      text: "Submit",
      type: "submit",
      click: function click() {
        $(this).dialog("close");
      }
    }],
    close: function close(event, ui) {
      var credentials = $("#user").val() + "+" + $("#password").val();

      if (checkCredentials(credentials)) {
        localStorage.setItem("credentials", credentials);
        $("#dialog").hide();
        displaySite();
        return;
      } else {
        alert("Invalid Credentials");
        login();
      }
    }
  });
}

function listingsSearch() {
  var listings = $('.listing-preview');
  $(listings).hide();

  var locationFilter = $('#location-filter').find(":selected").val().toLowerCase();
  var statusFilter = $('#status-filter').find(":selected").val().toLowerCase();
  var typeFilter = $('#type-filter').find(":selected").val().toLowerCase();
  var minRoomFilter = parseInt($('#min-rooms').find(":selected").val());
  var minSizeFilter = parseInt($('#min-size').val());
  var maxPriceFilter = parseInt($('#max-price').val());

  var filteredListings = $('.listing-preview').filter(function () {
    var lease = $(this).data("lease");
    return ($(this).data("available").toString() === statusFilter || statusFilter === "n/a") && ($(this).data("location").toLowerCase() === locationFilter || locationFilter === "n/a") && ($(this).data("lease") === (typeFilter === "lease") || $(this).data("buy") === (typeFilter === "buy") || typeFilter === "n/a" || $(this).data("lease") && $(this).data("buy")) && parseInt($(this).data("rooms")) >= minRoomFilter && (parseInt($(this).data("size").toString().replace(",", "")) >= minSizeFilter || isNaN(minSizeFilter)) && (parseInt($(this).data("price").toString().replace(",", "")) <= maxPriceFilter || isNaN(maxPriceFilter));
  });

  paginate(filteredListings);
}

function compatibleBrowser() {
  return !(navigator.userAgent.indexOf("MSIE 9") > -1);
}