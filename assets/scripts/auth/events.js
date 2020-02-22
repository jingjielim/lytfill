'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const photoEvents = require('../photo/events')
const api = require('./api')
const ui = require('./ui')

const onSignUp = (event) => {
  event.preventDefault()

  const form = event.target
  const userData = getFormFields(form)
  api.signUp(userData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}
const onSignIn = (event) => {
  event.preventDefault()

  const form = event.target
  const userData = getFormFields(form)
  api.signIn(userData)
    .then(function (response) {
      ui.onSignInSuccess(response)
      photoEvents.onGetPhotos()
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
const onSignOut = (event) => {
  event.preventDefault()

  api.signOut()
    .then(function (response) {
      ui.onSignOutSuccess(response)
      photoEvents.onGetPhotos()
    })
    .catch(ui.onSignOutFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut
}
