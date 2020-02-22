const store = require('../store')

const sysMsg = (type, state, msg) => {
  $('.sys-message').append(`<div class="${type}  alert row alert-dismissible fade show" role="alert"> ${msg} <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button> </div>`)
  $(`.${type}`).addClass(`alert-${state}`)
  setTimeout(() => {
    $(`.${type}`).remove()
  }, 5000)
}

const onSignUpSuccess = (response) => {
  $('.sign-up-form').trigger('reset')
  const msg = `Sign up success for ${response.user.email}`
  const type = 'sign-up-s'
  const state = 'success'
  sysMsg(type, state, msg)
}

const onSignUpFailure = (response) => {
  const resText = JSON.parse(response.responseText)
  let msg = ''
  for (const key in resText) {
    msg = msg + ' ' + key + ' ' + resText[key] + '. '
  }
  const type = 'sign-up-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onSignInSuccess = (response) => {
  $('.sign-in-form').trigger('reset')
  $('.signed-in').show()
  $('.not-signed-in').hide()
  store.user = response.user

  const msg = `${response.user.email} signed in`
  const state = 'success'
  const type = 'sign-in-s'
  sysMsg(type, state, msg)
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
  sysMsg(type, state, msg)
  $('.sign-in-form').trigger('reset')
}

const onSignOutSuccess = (response) => {
  $('.signed-in').hide()
  $('.not-signed-in').show()
  $('.content').empty()
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
}

const onChangePasswordFailure = (response) => {
  const msg = 'Change password failed'
  const state = 'danger'
  const type = 'change-pw-f'
  sysMsg(type, state, msg)
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
