const store = require('../store')

const onSignUpSuccess = (response) => {
  $('.sign-up-form').trigger('reset')
  console.log('Sign up success')
  console.log(response)
}

const onSignUpFailure = (response) => {
  console.log('Sign up failure')
  console.log(response.responseText)
}

const onSignInSuccess = (response) => {
  $('.sign-in-form').trigger('reset')
  $('.signed-in').show()
  $('.not-signed-in').hide()
  store.user = response.user
  console.log('Sign in success')
}

const onSignInFailure = (response) => {
  console.log('Sign in failure')
  console.log(response.responseText)
}

const onSignOutSuccess = (response) => {
  $('.signed-in').hide()
  $('.not-signed-in').show()
  $('.content').empty()
  console.log('Sign out success')
  console.log(response)
}

const onSignOutFailure = (response) => {
  console.log('Sign out failure')
  console.log(response)
}

const onChangePasswordSuccess = (response) => {
  $('.change-pw-form').trigger('reset')

  console.log('Change password success')
  console.log(response)
}

const onChangePasswordFailure = (response) => {
  console.log('Change password failure')
  console.log(response)
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
