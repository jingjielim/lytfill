'use strict'

const showPhotosTemplate = require('../templates/photo-listings.handlebars')
const showPhotoTemplate = require('../templates/photo-show.handlebars')
const editPhotoTemplate = require('../templates/update-photo.handlebars')
const sharePhotoTemplate = require('../templates/share-photo.handlebars')
const signInNavTemplate = require('../templates/signed-in-nav.handlebars')
const store = require('../store')

const sysMsg = (type, state, msg) => {
  $('.sys-message').append(`<div class="${type}"> ${msg} </div>`)
  $(`.${type}`).addClass(`alert-${state} alert row`)
  setTimeout(() => {
    $(`.${type}`).remove()
  }, 5000)
}

const onSharePhoto = () => {
  $('.content').html(sharePhotoTemplate())
  $('.navbar').html(signInNavTemplate({user: store.user.email}))
}

const onGetPhotosSuccess = (data) => {
  store.photos = data.photos
  const showPhotosHtml = showPhotosTemplate({photos: data.photos})
  $('.content').html(showPhotosHtml)
}

const onGetPhotosFailure = (response) => {
  const msg = `Failed to get Photos`
  const type = 'get-photos-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onGetPhotoSuccess = (response) => {
  console.log(response.photo)
  const showPhotoHtml = showPhotoTemplate({photo: response.photo})
  $('.content').html(showPhotoHtml)
}

const onGetPhotoFailure = (response) => {
  console.log(response)
}

const onCreatePhotoSuccess = (response) => {
  $('.create-photo-form').trigger('reset')
}

const onCreatePhotoFailure = (response) => {
  const msg = `Failed to create new photo`
  const type = 'create-photos-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onDeletePhotoFailure = (response) => {
  const msg = `Failed to delete photo`
  const type = 'del-photos-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onEditPhotoSuccess = (response) => {
  const editPhotoHtml = editPhotoTemplate({photo: response.photo})
  store.editPhotoId = response.photo.id
  console.log(store)
  $('.content').html(editPhotoHtml)
}

const onEditPhotoFailure = (response) => {
  const msg = `Failed to get photo to edit`
  const type = 'edit-photos-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onUpdatePhotoSuccess = (response) => {
  store.editPhotoId = null
  $('.update-photo-form').empty()
  const msg = `Photo updated!`
  const type = 'update-photos-s'
  const state = 'success'
  sysMsg(type, state, msg)
}

const onUpdatePhotoFailure = (response) => {
  const msg = `Failed to update photo`
  const type = 'update-photos-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

module.exports = {
  onGetPhotosSuccess,
  onGetPhotosFailure,
  onGetPhotoSuccess,
  onGetPhotoFailure,
  onCreatePhotoSuccess,
  onCreatePhotoFailure,
  onDeletePhotoFailure,
  onEditPhotoSuccess,
  onEditPhotoFailure,
  onUpdatePhotoSuccess,
  onUpdatePhotoFailure,
  onSharePhoto
}
