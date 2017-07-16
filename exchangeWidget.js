// sets up a namespace in the window object to prevent collisions
if (!window.XR) {
    window.XR = {};
}

// define a method for making an http request
XR.loadData = function(uri, callbacks, params) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", encodeURI(uri));
    // Define a function to handle the response data.
    xhr.onload = function() {
        if (xhr.status === 200) {
            callbacks.success(xhr, params);
        } else {
            callbacks.failure(params);
            if (!!console) {
                console.log("Request failed. Returned status of " + xhr.status);
            }
        }
    };
    xhr.send();
}

// load exchange rates
var uri = "http://api.fixer.io/latest";
XR.loadData(uri, {
    success: function(xhr, params) {
        var payload = JSON.parse(xhr.responseText);
        XR.exchangeRates = payload;
    },
    failure: function(params) {
        XR.exchangeRates = "unreachable";
        console("ERROR: Unable to talk to config URL: " + params.uri);
    }
}, {
    success: {
        uri: uri
    },
    failure: {
        uri: uri
    }
});