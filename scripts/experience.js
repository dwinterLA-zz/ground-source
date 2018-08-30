$(document).ready(function() {
  stateFromQuery()
  setClickHandlers()

  function stateFromQuery() {
    var query = (location.search.match(new RegExp('service' + "=(.*?)($|\&)", "i")) || [])[1]
    switch (query) {
      case 'tenant':
        setState('.state--tenant')
        break;
      case 'landlord':
        setState('.state--landlord')
        break;
      case 'investment':
        setState('.state--investment')
        break;
      default:
        // TODO: create a default state? But what would we place on the bottom?
        setState('.state--tenant')
    }

  }

  function setState(state) {
    setActiveLink(state)
    $('.state').hide()
    $(state).show()
    // slick carousel needs to calc dimensions
    $(window).trigger('resize');
  }

  function setActiveLink(state) {
    $('.state__link').removeClass('active')
    $(state + '.state__link').addClass('active')
  }

  function setClickHandlers() {
    $('.state__link').on('click', function(event) {
      event.preventDefault()
    })
    $('#tenant-service-link').on('click', function() {
      setState('.state--tenant')
    })
    $('#landlord-service-link').on('click', function() {
      setState('.state--landlord')
    })
    $('#investment-service-link').on('click', function() {
      setState('.state--investment')
    })
  }
})
