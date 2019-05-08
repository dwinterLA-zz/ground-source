---
---
// do not remove the dashes above, they are required for babel to work

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

  $('.modal__close').click(function() {
    $('body').removeClass('overflow-hidden');
    $('.modal').fadeOut();
  });

  $(".contact-us-link").click(function() {
    $('body').addClass('overflow-hidden')
    $(".modal--active").fadeOut();
    $(".contact-us-modal").fadeIn();
    $(".contact-us-modal").addClass("modal--active");
    $(".nav-modal").fadeOut();
  });

  $('.ham-menu').click(function(){
    $('body').addClass('overflow-hidden');
    $('.nav-modal').fadeIn();
  });

  $('.menu-close').click(function(){
    $('body').removeClass('overflow-hidden');
    $('.nav-modal').fadeOut();
  });
})
