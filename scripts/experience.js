// do not remove the dashes above, they are required for babel to work

"use strict";

$(document).ready(function () {
  stateFromQuery();
  setClickHandlers();
  scrollReveal();
});

function stateFromQuery() {
  var query = (location.search.match(new RegExp("service" + "=(.*?)($|&)", "i")) || [])[1];
  switch (query) {
    case "tenant":
      setState($(".state--tenant"));
      break;
    case "landlord":
      setState($(".state--landlord"));
      break;
    case "investment":
      setState($(".state--investment"));
      break;
    default:
      setState($(".state--default"));
  }
}

function setState($newState) {
  $(".state").removeClass("active");
  $newState.addClass("active");

  slickCarousel($(".examples.active").find(".services-carousel"));
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

function setClickHandlers() {
  $(".state__link").on("click", function (event) {
    event.preventDefault();
  });
  $("#experience-default-link").on("click", function () {
    updateQueryParam();
    setState($(".state--default"));
  });
  $("#tenant-service-link").on("click", function () {
    updateQueryParam("tenant");
    setState($(".state--tenant"));
  });
  $("#landlord-service-link").on("click", function () {
    updateQueryParam("landlord");
    setState($(".state--landlord"));
  });
  $("#investment-service-link").on("click", function () {
    updateQueryParam("investment");
    setState($(".state--investment"));
  });
}

function updateQueryParam(state) {
  if (state) {
    history.pushState(null, "", "/experience.html?service=" + state);
  } else {
    history.pushState(null, "", "/experience.html");
  }
}

function scrollReveal() {
  window.sr = ScrollReveal();
  sr.reveal(".top");
}