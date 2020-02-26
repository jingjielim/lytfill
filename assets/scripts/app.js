'use strict'
const authEvents = require('./auth/events')
const photoEvents = require('./photo/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  const $grid = $('.photos').isotope({
    itemSelector: '.grid-item',
    getSortData: {
      likeNum: '.like-number parseInt',
      comNum: '.com-number parseInt',
      mostRecent: '.date'
    }
  })
  photoEvents.onPageLoad($grid)
  // Auth event Listeners
  authEvents.addEventListeners($grid)
  // Photo Event Listeners
  photoEvents.addEventListeners($grid)
})
