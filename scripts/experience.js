$(document).ready(function() {
  stateFromQuery();
  setClickHandlers();
  servicesCarousel();
  scrollReveal();
});

function stateFromQuery() {
  var query = (location.search.match(
    new RegExp("service" + "=(.*?)($|&)", "i")
  ) || [])[1];
  switch (query) {
    case undefined:
      setState(".state--default");
      break;
    case "tenant":
      setState(".state--tenant");
      break;
    case "landlord":
      setState(".state--landlord");
      break;
    case "investment":
      setState(".state--investment");
      break;
    default:
      setState(".state--default");
  }
}

function setState(state) {
  setActiveLink(state);
  $(state).addClass("active");
  setupCarousel();
}

function servicesCarousel() {
  $(".services-carousel").slick({
    autoplay: false,
    draggable: false,
    dots: true,
    prevArrow: false,
    nextArrow: false
  });
}

function setupCarousel() {
  if ($(".services-carousel:visible").length > 0) {
    $(".services-carousel").slick("unslick");
    $(".services-carousel").slick({
      autoplay: false,
      draggable: false,
      dots: true,
      prevArrow: false,
      nextArrow: false
    });
  }
}
function setActiveLink(state) {
  $(".state").removeClass("active");
  $(".state__link").removeClass("active");
  $(state + ".state__link").addClass("active");
}

function setClickHandlers() {
  $(".state__link").on("click", function(event) {
    event.preventDefault();
  });
  $("#experience-default-link").on("click", function() {
    updateQueryParam();
    setState(".state--default");
  });
  $("#tenant-service-link").on("click", function() {
    updateQueryParam("tenant");
    setState(".state--tenant");
  });
  $("#landlord-service-link").on("click", function() {
    updateQueryParam("landlord");
    setState(".state--landlord");
  });
  $("#investment-service-link").on("click", function() {
    updateQueryParam("investment");
    setState(".state--investment");
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
