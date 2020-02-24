'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onGetPhotos = () => {
  api.getPhotos()
    .then(ui.onGetPhotosSuccess)
    .catch(ui.onGetPhotosFailure)
}

const onGetPhoto = (event) => {
  const photoId = $(event.target).data('id')

  api.getPhoto(photoId)
    .then(ui.onGetPhotoSuccess)
    .catch(ui.onGetPhotoFailure)
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
  const photoId = $(event.target).data('id')
  const form = event.target
  const photoData = getFormFields(form)

  api.updatePhoto(photoData, photoId)
    .then(function () {
      ui.onUpdatePhotoSuccess()
      onGetPhoto(event)
    })
    .catch(ui.onUpdatePhotoFailure)
}

const onSharePhoto = (event) => {
  event.preventDefault()
  ui.onSharePhoto()
}

const onAddComment = (event) => {
  event.preventDefault()

  const form = event.target
  const commentData = getFormFields(form)
  api.addComment(commentData)
    .then(ui.onAddCommentSuccess)
    .catch(ui.onAddCommentFailure)
}

const onPreviewPhoto = (photoUrl) => {
  $('.preview-img').attr('src', photoUrl).addClass('img-thumbnail')
}

const onDeleteComment = (event) => {
  const commentId = $(event.target).data('id')
  api.deleteComment(commentId)
    .then((response) => {
      ui.onDeleteCommentSuccess(response)
      $(event.target.parentNode).remove()
    })
    .catch(ui.onDeleteCommentFailure)
}

module.exports = {
  onGetPhotos,
  onGetPhoto,
  onCreatePhoto,
  onDeletePhoto,
  onEditPhoto,
  onUpdatePhoto,
  onSharePhoto,
  onPreviewPhoto,
  onAddComment,
  onDeleteComment
}
