$(document).ready(function() {
  DOMBindings();
  googleMap();
  gallery();
  scrollReveal();
});

function DOMBindings() {
  $("#print-brochure").click(function() {
    window.print();
  });
}
function googleMap() {
  const coords = {
    lat: parseFloat(listingMap.latitude),
    lng: parseFloat(listingMap.longitude)
  };

  if (!coords.lat || !coords.lng) {
    return false;
  }

  $.getScript(
    `https://maps.googleapis.com/maps/api/js?key=${listingMap.apiKey}`,
    () => {
      const coords = {
        lat: parseFloat(listingMap.latitude),
        lng: parseFloat(listingMap.longitude)
      };

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
