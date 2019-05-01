const VALID_MAILER_KEYS = ["name", "email", "phone"];

function validEmail(email) {
  // see:
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

function validHuman(honeypot) {
  if (honeypot) {
    //if hidden form filled up
    return false;
  } else {
    return true;
  }
}

// get all data in form and return object
function getFormData() {
  var elements = document.getElementById("gform").elements; // all form elements
  var fields = Object.keys(elements)
    .map(function(k) {
      if (elements[k].name !== undefined) {
        return elements[k].name;
        // special case for Edge's html collection
      } else if (elements[k].length > 0) {
        return elements[k].item(0).name;
      }
    })
    .filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });
  var data = {};
  fields.forEach(function(k) {
    data[k] = elements[k].value;
    var str = ""; // declare empty string outside of loop to allow
    // it to be appended to for each item in the loop
    if (elements[k].type === "checkbox") {
      // special case for Edge's html collection
      str = str + elements[k].checked + ", "; // take the string and append
      // the current checked value to
      // the end of it, along with
      // a comma and a space
      data[k] = str.slice(0, -2); // remove the last comma and space
      // from the  string to make the output
      // prettier in the spreadsheet
    } else if (elements[k].length) {
      for (var i = 0; i < elements[k].length; i++) {
        if (elements[k].item(i).checked) {
          str = str + elements[k].item(i).value + ", "; // same as above
          data[k] = str.slice(0, -2);
        }
      }
    }
  });
  return data;
}

function handleFormSubmit(event) {
  event.preventDefault();
  var data = getFormData();
  $("#gform").hide();
  $("#form-submit-loader").show();

  // I've chosen 'albuquerque', instead of the standard 'honeypot' field name (for spam detection), because
  // I fear that spammers will catch on to this technique and eventually, their software just won't enter a value
  // if the name of the field is 'honeypot'

  if (!validHuman(data.albuquerque)) {
    showFailedState();
    return;
  }

  if (!validEmail(data.email)) {
    $("#gform").show();
    $("#form-submit-loader").hide();
    $("#email-invalid").show();
    return false;
  } else {
    var url =
      "https://script.google.com/macros/s/AKfycbzfbEoLceZY6ZVXRjwOJU5J_iu4gW15y9vSSLuwXjGEk0w7ojg/exec";
    var encoded = Object.keys(data)
      .reduce(function(encodedData, currentKey) {
        if (VALID_MAILER_KEYS.includes(currentKey)) {
          encodedData.push(
            encodeURIComponent(currentKey) +
              "=" +
              encodeURIComponent(data[currentKey])
          );
        }

        return encodedData;
      }, [])
      .join("&");

    $.ajax({
      type: "POST",
      url: url,
      data: encoded
    })
      .fail(function() {
        showFailedState();
      })
      .success(function() {
        document.getElementById("form-submit-loader").style.display = "none";
        document.getElementById("thankyou_message").style.display = "block";
      });
  }

  function showFailedState() {
    document.getElementById("form-submit-loader").style.display = "none";
    document.getElementById("error_message").style.display = "block";
  }
}

function loaded() {
  // bind to the submit event of our form
  var form = document.getElementById("gform");
  form.addEventListener("submit", handleFormSubmit, false);
}
document.addEventListener("DOMContentLoaded", loaded, false);
