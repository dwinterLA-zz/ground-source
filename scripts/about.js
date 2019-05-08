// do not remove the dashes above, they are required for babel to work

"use strict";

$(document).ready(function () {
  bindDOM();
  scrollReveal();
});

function bindDOM() {
  $(".agent-modal-link").click(function () {
    var agent = $(this).data("agent");

    $("#agent-" + agent).fadeIn();
    $("body").addClass("overflow-hidden");
  });
}

function scrollReveal() {
  window.sr = ScrollReveal();
  sr.reveal(".header-image");
  sr.reveal(".head-title");
  sr.reveal(".about-main-text");
  sr.reveal(".agents");
}