'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const photoEvents = require('../photo/events')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const onPageLoad = () => {
  store.user = null
  ui.onPageLoad()
  photoEvents.onGetPhotos()
  // Initialise isotope
  // const $grid = $('.photos').isotope({
  //   itemSelector: '.grid-item'
  // })
  // $grid.isotope('shuffle')
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
    .then((response) => {
      ui.onSignInSuccess(response)
      if ($('img.photo-show').length === 1) {
        const event = {
          'target': $('img.photo-show')[0].outerHTML
        }
        photoEvents.onGetPhoto(event)
      } else {
        photoEvents.onGetPhotos()
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
const onSignOut = (event) => {
  event.preventDefault()

  api.signOut()
    .then(() => {
      ui.onSignOutSuccess()
      if ($('img.photo-show').length === 1) {
        const event = {
          'target': $('img.photo-show')[0].outerHTML
        }
        photoEvents.onGetPhoto(event)
      } else {
        photoEvents.onGetPhotos()
      }
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
