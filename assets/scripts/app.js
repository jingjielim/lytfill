'use strict'
const authEvents = require('./auth/events')
const photoEvents = require('./photo/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  authEvents.onPageLoad()
  // Auth Event Listeners
  $('.sign-up-form').on('submit', authEvents.onSignUp)
  $('.sign-in-form').on('submit', authEvents.onSignIn)
  $('.navbar').on('click', '.sign-out-btn', authEvents.onSignOut)
  $('.change-pw-form').on('submit', authEvents.onChangePassword)

  // Photo Event Listeners
  $('.content').on('click', '.preview', () => {
    photoEvents.onPreviewPhoto($('.photo-url').val())
  })
  $('.navbar').on('click', '.share-photo', photoEvents.onSharePhoto)
  $('.navbar').on('click', '.navbar-brand', photoEvents.onGetPhotos)
  $('.content').on('submit', '.create-photo-form', photoEvents.onCreatePhoto)
  $('.content').on('submit', '.update-photo-form', photoEvents.onUpdatePhoto)
  $('.content').on('submit', '.comment-form', photoEvents.onAddComment)
  $('.content').on('click', '.edit-photo-btn', photoEvents.onEditPhoto)
  $('.content').on('click', '.delete-photo-btn', photoEvents.onDeletePhoto)
  $('.content').on('click', '.delete-comment-btn', photoEvents.onDeleteComment)
  $('.content').on('click', '.card-img-top', photoEvents.onGetPhoto)
  $('.content').on('click', '.fa-comment', photoEvents.onGetPhoto)
  // $('.content').on('click', '.like', (event) => $(event.target).removeClass('like fas').addClass('no-like far'))
  // $('.content').on('click', '.no-like', (event) => $(event.target).removeClass('no-like far').addClass('like fas'))

  // Dev code for fast sign in
  // $('#signInEmail').val('j@jjj')
  // $('#signInPass').val('1')
  // $('.sign-in-form').submit()
})
