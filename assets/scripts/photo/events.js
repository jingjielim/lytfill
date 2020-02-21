'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onGetPhotos = () => {
  event.preventDefault()

  api.getPhotos()
    .then(ui.onGetPhotosSuccess)
    .catch(ui.onGetPhotosFailure)
}

const onCreatePhoto = () => {
  event.preventDefault()

  const form = event.target
  const photoData = getFormFields(form)
  api.createPhoto(photoData)
    .then(ui.onCreatePhotoSuccess)
    .catch(ui.onCreatePhotoFailure)
}

module.exports = {
  onGetPhotos,
  onCreatePhoto
}
