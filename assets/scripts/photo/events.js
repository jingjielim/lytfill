'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onGetPhotos = (event) => {
  event.preventDefault()

  api.getPhotos()
    .then(ui.onGetPhotosSuccess)
    .catch(ui.onGetPhotosFailure)
}

const onCreatePhoto = (event) => {
  event.preventDefault()

  const form = event.target
  const photoData = getFormFields(form)
  api.createPhoto(photoData)
    .then(function () {
      ui.onCreatePhotoSuccess()
      onGetPhotos(event)
    })
    .catch(ui.onCreatePhotoFailure)
}

const onDeletePhoto = (event) => {
  event.preventDefault()

  const photoId = $(event.target).data('id')
  api.deletePhoto(photoId)
    .then(function () { onGetPhotos(event) })
    .catch(ui.onDeletePhotoFailure)
}

const onEditPhoto = (event) => {
  event.preventDefault()
  const photoId = $(event.target).data('id')
  api.getPhoto(photoId)
    .then(ui.onEditPhotoSuccess)
    .catch(ui.onEditPhotoFailure)
}

const onUpdatePhoto = (event) => {
  event.preventDefault()

  const form = event.target
  const photoData = getFormFields(form)
  api.updatePhoto(photoData)
    .then(function () {
      ui.onUpdatePhotoSuccess()
      onGetPhotos(event)
    })
    .catch(ui.onUpdatePhotoFailure)
}

module.exports = {
  onGetPhotos,
  onCreatePhoto,
  onDeletePhoto,
  onEditPhoto,
  onUpdatePhoto
}
