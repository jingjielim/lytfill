'use strict'
const authEvents = require('./auth/events')
const photoEvents = require('./photo/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.signed-in').hide()
  // Auth Event Listeners
  $('.sign-up-form').on('submit', authEvents.onSignUp)
  $('.sign-in-form').on('submit', authEvents.onSignIn)
  $('.sign-out-btn').on('click', authEvents.onSignOut)
  $('.change-pw-form').on('submit', authEvents.onChangePassword)

  // Photo Event Listeners
  $('.get-photos').on('click', photoEvents.onGetPhotos)
  $('.create-photo-form').on('submit', photoEvents.onCreatePhoto)

  // Dev code for fast sign in
  // $('#signInEmail').val('j@jjj')
  // $('#signInPass').val('1')
  // $('.sign-in-form').submit()
})
