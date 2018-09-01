$(document).ready(function() {
  setClickHandlers()
  setupReviewCarousel()
  setupExampleCarousel()

  function setupExampleCarousel() {
    if ($('.services-carousel:visible').length > 0) {
      $('.services-carousel').slick('unslick');
      $('.services-carousel').slick({
        "autoplay": false,
        "draggable": false,
        "dots": true,
        "prevArrow": false,
        "nextArrow": false
      });
    }
  }

  function setupReviewCarousel() {
    $('.review-carousel').slick({
      "autoplay": false,
      "draggable": false,
      "dots": true,
      "prevArrow": $('.navigation-arrow-left'),
      "nextArrow": $('.navigation-arrow-right')
    })
  }

  function setClickHandlers() {
    $("#tenant-service-modal-button").click(function() {
      modalOffset = window.pageYOffset;
      $(".main").addClass('modal-open');
      $(".main").addClass('mobile-bg-hide');
      $("#tenant-service-modal").fadeIn();
      setupExampleCarousel();
    })

    $("#investment-service-modal-button").click(function() {
      modalOffset = window.pageYOffset;
      $("#investment-service-modal").fadeIn();
      $(".main").addClass("modal-open");
      $(".main").addClass("mobile-bg-hide");
      setupExampleCarousel()
    })

    $("#landlord-service-modal-button").click(function() {
      modalOffset = window.pageYOffset;
      $("#landlord-service-modal").fadeIn();
      $(".main").addClass("modal-open");
      $('.main').addClass('mobile-bg-hide');
      setupExampleCarousel()
    })

    $('.service-detail-close').click(function() {
      $('.main').removeClass('modal-open');
      $('body').removeClass('overflow-hidden');
      $('.service-detail').fadeOut();
      window.scrollTo(0, modalOffset);
    });
  }
})
