---
---
// do not remove the dashes above, they are required for babel to work

$(document).ready(function() {
  DOMBindings();
  gMap();
  gallery();
  scrollReveal();
});

function DOMBindings() {
  $("#print-brochure").click(function() {
    window.print();
  });
}
function gMap() {
  const coords = {
    lat: parseFloat(listingMapMeta.latitude),
    lng: parseFloat(listingMapMeta.longitude)
  };

  if (!coords.lat || !coords.lng) {
    return false;
  }

  $.getScript(
    `https://maps.googleapis.com/maps/api/js?key=${listingMapMeta.apiKey}`,
    () => {
      const map = new google.maps.Map(
        document.getElementById("listing-google-map"),
        {
          zoom: 12,
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

function gallery() {
  $(".listing-carousel").slick({
    prevArrow: $(".gallery-arrow-left"),
    nextArrow: $(".gallery-arrow-right")
  });
}

function scrollReveal() {
  window.sr = ScrollReveal();
  sr.reveal(".info-box");
  sr.reveal(".img-responsive");
}
