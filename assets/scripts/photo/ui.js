'use strict'

const showPhotosTemplate = require('../templates/photo-listings.handlebars')
const editPhotoTemplate = require('../templates/update-photo.handlebars')
const store = require('../store')

const onGetPhotosSuccess = (data) => {
  store.photos = data.photos
  const showPhotosHtml = showPhotosTemplate({photos: data.photos})
  $('.content').html(showPhotosHtml)
}

const onGetPhotosFailure = (response) => {
  console.log(response)
}

const onCreatePhotoSuccess = (response) => {
  $('.create-photo-form').trigger('reset')
}

const onCreatePhotoFailure = (response) => {
  console.log(response)
}

const onDeletePhotoFailure = (response) => {
  console.log(response)
}

const onEditPhotoSuccess = (response) => {
  const editPhotoHtml = editPhotoTemplate({photo: response.photo})
  store.editPhotoId = response.photo.id
  $('.update-photo-form').html(editPhotoHtml)
}

const onEditPhotoFailure = (response) => {
  console.log('failed to edit photo')
}

const onUpdatePhotoSuccess = (response) => {
  store.editPhotoId = null
  $('.update-photo-form').empty()
}

const onUpdatePhotoFailure = (response) => {
  console.log(response.responseText)
}

module.exports = {
  onGetPhotosSuccess,
  onGetPhotosFailure,
  onCreatePhotoSuccess,
  onCreatePhotoFailure,
  onDeletePhotoFailure,
  onEditPhotoSuccess,
  onEditPhotoFailure,
  onUpdatePhotoSuccess,
  onUpdatePhotoFailure
}
