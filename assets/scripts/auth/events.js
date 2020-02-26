'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const photoEvents = require('../photo/events')
// const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const addEventListeners = ($grid) => {
  $('.sign-up-form').on('submit', onSignUp)
  $('.sign-in-form').on('submit', (event) => {
    onSignIn(event, $grid)
  })
  $('.navbar').on('click', '.sign-out-btn', (event) => {
    onSignOut(event, $grid)
  })
  $('.change-pw-form').on('submit', onChangePassword)
  // Dev code for fast sign in
  // $('#signInEmail').val('Ward@gmail.com')
  // $('#signInPass').val('1')
  // $('.sign-in-form').submit()
}

const onSignUp = (event) => {
  event.preventDefault()

  const form = event.target
  const userData = getFormFields(form)
  api.signUp(userData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = (event, $grid) => {
  event.preventDefault()

  const form = event.target
  const userData = getFormFields(form)
  api.signIn(userData)
    .then((response) => {
      ui.onSignInSuccess(response)
      if ($('img.photo-show').length === 1) {
        const fakeEvent = {
          'target': $('img.photo-show')[0].outerHTML
        }
        photoEvents.onGetPhoto(fakeEvent)
      } else {
        photoEvents.onGetPhotos(event, $grid)
      }
    })
    .catch(ui.onSignInFailure)
}

const onChangePassword = (event) => {
  event.preventDefault()

  const form = event.target
  const userData = getFormFields(form)

  api.changePassword(userData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}
const onSignOut = (event, $grid) => {
  event.preventDefault()

  api.signOut()
    .then(() => {
      ui.onSignOutSuccess()
      if ($('img.photo-show').length === 1) {
        const fakeEvent = {
          'target': $('img.photo-show')[0].outerHTML
        }
        photoEvents.onGetPhoto(fakeEvent)
      } else {
        photoEvents.onGetPhotos(event, $grid)
      }
    })
    .catch(ui.onSignOutFailure)
}

module.exports = {
  addEventListeners,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut
}
