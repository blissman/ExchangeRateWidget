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
            console.log("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.send();
}

// load exchange rates to XR.exchangeRates object
XR.populateDataLayer = function(uri) {
    XR.loadData(uri, {
        success: function(xhr, params) {
            var payload = JSON.parse(xhr.responseText);
            XR.exchangeRates = payload;
        },
        failure: function(params) {
            XR.exchangeRates = "unreachable";
            console.log("ERROR: Unable to talk to config URL: " + params.uri);
        }
    }, {
        success: {
            uri: uri
        },
        failure: {
            uri: uri
        }
    });
}

// test for the exchangeWidget name in the id
XR.regexTest = function(element) {
    var regexTest = new RegExp(/\bexchangeWidget\-/);

    return regexTest.test(element.id);
}

// gets the exchange rate from the XR.exchangeRates data layer
XR.getRate = function(element) {
    var currency = document.getElementById(element).value;
    var rate;
    if (currency === XR.exchangeRates.base) {
        rate = 1;
    } else {
        rate = XR.exchangeRates.rates[currency];
    }

    return rate;
}

// update the converted value when fields change
XR.updateConverted = function(element) {
    if (!!XR.exchangeRates) {
        if (document.getElementById(element + "-inputNumber").value === "") {
            document.getElementById(element + "-outputNumber").value = null;
        } else {
            var inputValue = parseFloat(document.getElementById(element + "-inputNumber").value);
            var inputRate = XR.getRate(element + "-inputCurrency");
            var outputRate = XR.getRate(element + "-outputCurrency");
            var outputValue = Math.round((inputValue / inputRate * outputRate) * 100) / 100;
            document.getElementById(element + "-outputNumber").value = outputValue;
        }
    } else {
        document.getElementById(element + "-outputNumber").value = "Server Unavailable";
    }
}

// populate the widget with html
XR.populateWidget = function(element) {
    var content = "<h1 class=\"title\"> Currency Converter </h1>";
    content += "<p class=\"subtitle\"> Type in amount and select currency: </p>";
    content += "<input type=\"number\" id=\"" + element + "-inputNumber\" name=\"inputNumber\" oninput=\"XR.updateConverted(\'" + element + "\')\" class=\"field\"><select id=\"" + element + "-inputCurrency\" onchange=\"XR.updateConverted(\'" + element + "\')\" class=\"selector\"><option value=\"CAD\">CAD</option><option value=\"USD\">USD</option><option value=\"EUR\">EUR</option></select>";
    content += "<p class=\"subtitle\"> Converted amount: </p>";
    content += "<input type=\"text\" id=\"" + element + "-outputNumber\" name=\"outputNumber\" class=\"field\" disabled><select id=\"" + element + "-outputCurrency\" onchange=\"XR.updateConverted(\'" + element + "\')\" class=\"selector\"><option value=\"CAD\">CAD</option><option value=\"USD\">USD</option><option value=\"EUR\">EUR</option></select>";
    content += "<br>";
    content += "<div class=\"disclaimer\">";
    content += "<a href=\"#\" onclick=\"alert(\'Exchange rate provided by fixer.io. For educational purposes only.\');\">Disclaimer</a>";
    content += "</div>";

    return content;
}

// appends style to the html
XR.appendStyles = function() {
    var styleNode = document.createElement("style");
    // define the style
    // widget div
    var style = ".exchangeWidget{";
    style += "padding: 1rem;";
    style += "min-width: 190px;";
    style += "max-width: 330px;";
    style += "border-style: solid;";
    style += "border-color: #000;";
    style += "border-width: 1px;";
    style += "overflow: hidden;";
    style += "}";
    // fields
    style += ".field{";
    style += "width: 50%;";
    style += "margin-right: 1rem;";
    style += "padding: 0.25rem;";
    style += "border-style: solid;";
    style += "border-color: #000;";
    style += "border-width: 1px;";
    style += "overflow: hidden;";
    style += "}";
    // selectors
    style += ".selector{";
    style += "padding: 0.25rem;";
    style += "border-style: solid;";
    style += "border-color: #000;";
    style += "border-width: 1px;";
    style += "overflow: hidden;";
    style += "}";
    // title
    style += ".title{";
    style += "font-family: \"Helvetica Neue\",Helvetica,Arial,sans-serif;";
    style += "overflow: hidden;";
    style += "}";
    // subtitle
    style += ".subtitle{";
    style += "font-family: \"Helvetica Neue\",Helvetica,Arial,sans-serif;";
    style += "padding: 0.25rem;";
    style += "overflow: hidden;";
    style += "}";
    // disclaimer
    style += ".disclaimer{";
    style += "font-family: \"Helvetica Neue\",Helvetica,Arial,sans-serif;";
    style += "width: 100%;";
    style += "text-align: right;";
    style += "padding: 0.25rem;";
    style += "overflow: hidden;";
    style += "}";
    // create a style text node with the style defined above
    var styleText = document.createTextNode(style);
    styleNode.appendChild(styleText);
    // get the head object
    var head = document.getElementsByTagName("head")[0];
    // append the style to the bottom of head
    head.appendChild(styleNode);
}

// check the dom for elements with the exchangeWidget prefix
XR.init = function() {
    XR.populateDataLayer("http://api.fixer.io/latestt");
    var i = 0;
    while (!!document.getElementById("exchangeWidget-" + i)) {
        document.getElementById("exchangeWidget-" + i).innerHTML = XR.populateWidget("exchangeWidget-" + i);
        i++;
    }
    XR.appendStyles();
}

// wait for the page to be ready (to prevent timing issues) and then fill the divs
document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        XR.init();
    }
}