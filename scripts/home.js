// do not remove the dashes above, they are required for babel to work

"use strict";

$(document).ready(function () {
  heroAnimation();
  gmap();
  navigation();
  scrollReveal();
  DOMBindings();
  reviewCarousel();
});

function navigation() {
  switch (window.location.hash) {
    case "#contact":
      $("body").addClass("overflow-hidden");
      $(".contact-us-modal").fadeIn();
      $(".nav-modal").fadeOut();
      break;
    case "#services":
      navActivateSection("active-section-services");
      break;
  }
}

function slickCarousel($content) {
  try {
    $content.slick("unslick");
  } catch (e) {}

  $content.slick({
    autoplay: false,
    draggable: false,
    dots: true,
    prevArrow: false,
    nextArrow: false
  });
}

function reviewCarousel() {
  $(".testimonial-carousel").slick({
    autoplay: false,
    draggable: false,
    dots: true,
    prevArrow: $(".navigation-arrow-left"),
    nextArrow: $(".navigation-arrow-right")
  });
}

function DOMBindings() {
  $(".scroll-arrow").click(function () {
    window.scrollTo({
      top: $("#hero-home").height(),
      left: 0,
      behavior: "smooth"
    });
  });

  $("#tenant-service-modal-button").click(function () {
    var $tenantModal = $("#tenant-service-modal");

    $("body").addClass("overflow-hidden");
    $tenantModal.fadeIn();
    slickCarousel($tenantModal.find(".services-carousel"));
  });

  $("#investment-service-modal-button").click(function () {
    var $investmentModal = $("#investment-service-modal");

    $investmentModal.fadeIn();
    $("body").addClass("overflow-hidden");
    slickCarousel($investmentModal.find(".services-carousel"));
  });

  $("#landlord-service-modal-button").click(function () {
    var $landlordModal = $("#landlord-service-modal");

    $landlordModal.fadeIn();
    $("body").addClass("overflow-hidden");
    slickCarousel($landlordModal.find(".services-carousel"));
  });

  $(".service-detail-close").click(function () {
    $("body").removeClass("overflow-hidden");
    $(".service-detail").fadeOut();
  });

  $(".services-home-button").click(function (event) {
    $(".body").removeClass("overflow-hidden");
    window.history.pushState(null, null, "#services");
    scrollToServices();
  });
}

function scrollReveal() {
  window.sr = ScrollReveal();
  sr.reveal(".home-intro-left");
  sr.reveal(".home-intro-right");
  sr.reveal(".services-header");
  sr.reveal(".testimonial-slideshow");
  sr.reveal(".services-text");
  sr.reveal("#contact-us-home-section");
}

function heroAnimation() {
  var logo = $("#header-logo");

  $(logo).addClass("prepareSlideUp");
  setTimeout(function () {
    $(logo).addClass("slideUp");
  }, 50);
  setTimeout(function () {
    $("#header-text").css("opacity", 1);
  }, 700);
}

function gmap() {
  $.getScript("https://maps.googleapis.com/maps/api/js?key=" + homeMapMeta.apiKey, function () {
    var coords = {
      lat: parseFloat(homeMapMeta.latitude),
      lng: parseFloat(homeMapMeta.longitude)
    };

    var map = new google.maps.Map(document.getElementById("gmap-home-page"), {
      zoom: 14,
      scrollwheel: false,
      disableDefaultUI: true,
      center: coords
    });

    new google.maps.Marker({
      position: coords,
      map: map
    });
  });
}

function scrollToServices() {
  $("body").removeClass("overflow-hidden");
  $(".nav-modal").fadeOut();
  navActivateSection("active-section-services");
  window.scrollTo({
    top: $("#services-content").offset().top,
    left: 0,
    behavior: "smooth"
  });
}

function navActivateSection(section) {
  $("[id^=active-section-]").attr("id", section);
}