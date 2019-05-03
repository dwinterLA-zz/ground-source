$(document).ready(function() {
  setClickHandlers();
  setupReviewCarousel();
  setupExampleCarousel();

  function setupExampleCarousel() {
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

  function setupReviewCarousel() {
    $(".testimonial-carousel").slick({
      autoplay: false,
      draggable: false,
      dots: true,
      prevArrow: $(".navigation-arrow-left"),
      nextArrow: $(".navigation-arrow-right")
    });
  }

  function setClickHandlers() {
    $("#tenant-service-modal-button").click(function() {
      $("body").addClass("overflow-hidden");
      $("#tenant-service-modal").fadeIn();
      setupExampleCarousel();
    });

    $("#investment-service-modal-button").click(function() {
      $("#investment-service-modal").fadeIn();
      $("body").addClass("overflow-hidden");
      setupExampleCarousel();
    });

    $("#landlord-service-modal-button").click(function() {
      $("#landlord-service-modal").fadeIn();
      $("body").addClass("overflow-hidden");
      setupExampleCarousel();
    });

    $(".service-detail-close").click(function() {
      $("body").removeClass("overflow-hidden");
      $(".service-detail").fadeOut();
    });
  }
});
