// Require Node modules in the browser thanks to Browserify: http://browserify.org
var bespoke = require('bespoke'),
  nebula = require('bespoke-theme-nebula'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  backdrop = require('bespoke-backdrop'),
  scale = require('bespoke-scale'),
  progress = require('bespoke-progress'),
  hash = require('bespoke-hash');

// Bespoke.js
var deck = bespoke.from('article', [
  nebula(),
  keys(),
  touch(),
  bullets('li, .bullet'),
  backdrop(),
  scale(),
  progress(),
  hash()
]);

// Prism syntax highlighting
// This is actually loaded from "bower_components" thanks to
// debowerify: https://github.com/eugeneware/debowerify
require('prism');

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(endtime) {
  var minutesSpan = document.querySelector('.minutes');
  var secondsSpan = document.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = (t.minutes);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var activated = false

deck.on('activate', function(event){
    if(event.slide.getAttribute('class').includes('clockSlide') && !activated) {
        var deadline = new Date(Date.parse(new Date()) + 5 * 60 * 1000); //five minutes from now
        initializeClock(deadline);
        activated = true;
    }
})

