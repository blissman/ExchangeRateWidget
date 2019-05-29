# ExchangeRateWidget

## Introduction

ExchangeRateWidget is a response JavaScript widget designed to read exchange rates from the api of [exchangeratesapi.io](http://exchangeratesapi.io/) and allow the user to calculate currency values between EUR, CAD, and USD.

## Installation

ExchangeRateWidget is simple to install by design. Start by including the exchangeWidget.js script into your html at the bottom of the body.
```html
<script src="path/to/exchangeWidget.js" async></script>
```

Next, to create instances of the exchange widget, add in divs with id's of "exchangeWidget-n" (where n is a unique number from 0-n), and the class of "exchangeWidget" (you can look at the included index.html file for an example).
```html
<div id="exchangeWidget-n" class="exchangeWidget"></div>
```

And that's it! ExchangeRateWidget should do the rest.

## Customization

ExchangeRateWidget's css styles can be customized! ExchangeRateWidget appends styles to the bottom of the head using the XR.appendStyles method. If you want to customize your styles, it's a simple as modifying the css therein.

## Future considerations
ExchangeRateWidget may include more features and capability in the future. This may include refactoring the code to handle more currencies, displaying the date of the current exchange rate information, and even supporting past exchange rate data.
