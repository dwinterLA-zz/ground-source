$(document).ready(function() {
  heroAnimation();
  setupGoogMap();
  activateNavigation();
  scrollReveal();
  setClickHandlers();
  setupReviewCarousel();
  setupExampleCarousel();
});

function activateNavigation() {
  switch (window.location.hash) {
    case "#contact":
      // TODO: we should have a global method for the state when the modal is open
      $("body").addClass("overflow-hidden");
      $(".contact-us-modal").fadeIn();
      $(".nav-modal").fadeOut();
      break;
    case "#services":
      navActivateSection("active-section-services");
      break;
  }
}

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

  $(".services-home-button").click(function(event) {
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
  setTimeout(function() {
    $(logo).addClass("slideUp");
  }, 50);
  setTimeout(function() {
    $("#header-text").css("opacity", 1);
  }, 700);
}

function setupGoogMap() {
  $.getScript(
    `https://maps.googleapis.com/maps/api/js?key=${gsMap.apiKey}`,
    () => {
      const coords = {
        lat: parseFloat(gsMap.latitude),
        lng: parseFloat(gsMap.longitude)
      };

      const map = new google.maps.Map(
        document.getElementById("gmap-home-page"),
        {
          zoom: 14,
          scrollwheel: false,
          disableDefaultUI: true,
          center: coords
        }
      );

      new google.maps.Marker({
        position: coords,
        map: map
      });
    }
  );
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
