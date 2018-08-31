$(document).ready(function() {
  stateFromQuery()
  setClickHandlers()

  function stateFromQuery() {
    var query = (location.search.match(new RegExp('service' + "=(.*?)($|\&)", "i")) || [])[1]
    switch (query) {
      case undefined:
        setState('.state--default')
        break;
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
        setState('.state--default')
    }
  }

  function setState(state) {
    setActiveLink(state)
    $('.state').hide()
    $(state).show(0, function() {
      // TODO: think of an actual solution
      setTimeout(function() {
        $(window).trigger('resize');
      }, 3000)
    })
  }

  function setActiveLink(state) {
    $('.state__link').removeClass('active')
    $(state + '.state__link').addClass('active')
  }

  function setClickHandlers() {
    $('.state__link').on('click', function(event) {
      event.preventDefault()
    })
    $('#experience-default-link').on('click', function() {
      updateQueryParam()
      setState('.state--default')
    })
    $('#tenant-service-link').on('click', function() {
      updateQueryParam('tenant')
      setState('.state--tenant')
    })
    $('#landlord-service-link').on('click', function() {
      updateQueryParam('landlord')
      setState('.state--landlord')
    })
    $('#investment-service-link').on('click', function() {
      updateQueryParam('investment')
      setState('.state--investment')
    })
  }

  function updateQueryParam(state) {
    if (state) {
      history.pushState(null, '', '/experience.html?service=' + state);
    } else {
      history.pushState(null, '', '/experience.html');
    }

  }
})
