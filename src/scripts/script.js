$(document).ready(function() {
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
    $('.agent-details').fadeIn();
    $('.main').addClass('mobile-bg-hide');
  })

  $('.listing-carousel').slick({
    "prevArrow": $('.gallery-arrow-left'),
    "nextArrow": $('.gallery-arrow-right')
  })
  $('.review-carousel').slick({
    "autoplay": false,
    "draggable": false,
    "prevArrow": $('.navigation-arrow-left'),
    "nextArrow": $('.navigation-arrow-right')
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
