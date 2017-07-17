# ExchangeRateWidget

## Introduction

ExchangeRateWidget is a response JavaScript widget designed to read exchange rates from the api of [fixer.io](http://fixer.io/) and allow the user to exchange currencies.

## Installation

ExchangeRateWidget is simple to install by design. Start by including the exchangeWidget.js script into your html.
```html
<script src="path/to/exchangeWidget.js" async></script>
```

Next, to create instances of the exchange widget, add in divs with id's of "exchangeWidget-n" (where n is a unique number), and the class of "exchangeWidget" (you can look at the included index.html file for an example).
```html
<div id="exchangeWidget-n" class="exchangeWidget"></div>
```

And that's it! ExchangeRateWidget should do the rest.