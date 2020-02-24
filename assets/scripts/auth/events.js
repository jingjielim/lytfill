'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const photoEvents = require('../photo/events')
const api = require('./api')
const ui = require('./ui')

const onPageLoad = () => {
  ui.onPageLoad()
  photoEvents.onGetPhotos()
}

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
    .then(() => {
      ui.onSignOutSuccess()
      onPageLoad()
    })
    .catch(ui.onSignOutFailure)
}

module.exports = {
  onPageLoad,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut
}
