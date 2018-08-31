$(document).ready(function() {
  setClickHandlers()
  setupCarousel()

  function setupCarousel() {
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

  function setClickHandlers() {
    $("#tenant-service-modal-button").click(function() {
      setupCarousel()
      modalOffset = window.pageYOffset;
      $(".main").addClass('modal-open');
      $(".main").addClass('mobile-bg-hide');
      $("#tenant-service-modal").fadeIn();
    })

    $("#investment-service-modal-button").click(function() {
      setupCarousel()
      modalOffset = window.pageYOffset;
      $("#investment-service-modal").fadeIn();
      $(".main").addClass("modal-open");
      $(".main").addClass("mobile-bg-hide");
    })

    $("#landlord-service-modal-button").click(function() {
      setupCarousel()
      modalOffset = window.pageYOffset;
      $("#landlord-service-modal").fadeIn();
      $(".main").addClass("modal-open");
      $('.main').addClass('mobile-bg-hide');
    })

    $('.service-detail-close').click(function() {
      $('.main').removeClass('modal-open');
      $('body').removeClass('overflow-hidden');
      $('.service-detail').fadeOut();
      window.scrollTo(0, modalOffset);
    });
  }
})
