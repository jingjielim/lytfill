const store = require('../store')
const signOutNavTemplate = require('../templates/signed-out-nav.handlebars')
const signInNavTemplate = require('../templates/signed-in-nav.handlebars')

const sysMsg = (type, state, msg) => {
  $('.sys-message').append(`<div class="${type}  alert row alert-dismissible fade show" role="alert"> ${msg} <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button> </div>`)
  $(`.${type}`).addClass(`alert-${state}`)
  setTimeout(() => {
    $(`.${type}`).remove()
  }, 5000)
}

const modalSysMsg = (type, state, msg) => {
  $(`.${type}-message`).append(`<div class="${type}  alert row alert-dismissible fade show" role="alert"> ${msg} <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button> </div>`)
  $(`.${type}`).addClass(`alert-${state}`)
  setTimeout(() => {
    $(`.${type}`).remove()
  }, 5000)
}

const onPageLoad = () => {
  $('.navbar').html(signOutNavTemplate())
}

const onSignUpSuccess = (response) => {
  $('.sign-up-form').trigger('reset')
  const msg = `Sign up success for ${response.user.name}`
  const type = 'sign-up-s'
  const state = 'success'
  sysMsg(type, state, msg)
  $('.navbar').html(signOutNavTemplate())
  $('#signUpModal').modal('hide')
}

const onSignUpFailure = (response) => {
  const resText = JSON.parse(response.responseText)
  let msg = ''
  for (const key in resText) {
    msg = msg + ' ' + key + ' ' + resText[key] + '. '
  }
  const type = 'sign-up-f'
  const state = 'danger'
  modalSysMsg(type, state, msg)
}

const onSignInSuccess = (response) => {
  $('.sign-in-form').trigger('reset')
  store.user = response.user
  const msg = `${store.user.name} signed in`
  const state = 'success'
  const type = 'sign-in-s'
  sysMsg(type, state, msg)
  $('.navbar').html(signInNavTemplate({user: store.user.name}))
  $('#signInModal').modal('hide')
}

const onSignInFailure = (response) => {
  let msg
  if (response.statusText === 'Unauthorized') {
    msg = 'Sign in failed: Incorrect email or password'
  } else {
    msg = 'Sign in failed'
  }
  const state = 'danger'
  const type = 'sign-in-f'
  modalSysMsg(type, state, msg)
}

const onSignOutSuccess = (response) => {
  const msg = 'Signed out successfully'
  const state = 'success'
  const type = 'sign-out-s'
  sysMsg(type, state, msg)
}

const onSignOutFailure = (response) => {
  const msg = 'Signed out failed'
  const state = 'danger'
  const type = 'sign-out-f'
  sysMsg(type, state, msg)
}

const onChangePasswordSuccess = (response) => {
  $('.change-pw-form').trigger('reset')
  const msg = 'Change password success'
  const state = 'success'
  const type = 'change-pw-s'
  sysMsg(type, state, msg)
  $('.navbar').html(signInNavTemplate({user: store.user.name}))
  $('#changePWModal').modal('hide')
}

const onChangePasswordFailure = (response) => {
  $('.change-pw-form').trigger('reset')
  const msg = 'Change password failed'
  const state = 'danger'
  const type = 'change-pw-f'
  modalSysMsg(type, state, msg)
}

module.exports = {
  onPageLoad,
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
