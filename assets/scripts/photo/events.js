'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onGetPhotos = () => {
  api.getPhotos()
    .then((response) => {
      ui.onGetPhotosSuccess(response)
    })
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

const filterFns = {
  myPhotos: function () {
    return `.${store.user.name}`
  },
  notMyPhotos: function () {
    return `:not('.${store.user.name}')`
  }
}

const onFilterFn = (event) => {
  const $grid = $('.photos').isotope({
    itemSelector: '.grid-item'
  })
  let filterValue = $(event.target).data('filter')
  if (filterFns[filterValue]) {
    filterValue = filterFns[filterValue]()
  }
  $grid.isotope({ filter: filterValue })
}

const onFilterUser = (event) => {
  event.preventDefault()
  const form = event.target
  const userData = getFormFields(form)
  $('.user-search-form').trigger('reset')
  const $grid = $('.photos').isotope({
    itemSelector: '.grid-item'
  })
  // If any string is entered as search term, try to filter with search term
  if (userData.user.name) {
    $grid.isotope({ filter: `.${userData.user.name}` })
  }
  // If nothing found based on search term return an error
  if (!$('.photos').isotope('getFilteredItemElements').length) {
    ui.onFilterUserFailure()
  }
}

const onAddLike = (event) => {
  const photoId = $(event.target).data('id')
  console.log(event.target.parentNode)
  api.addLike(photoId)
    .then(ui.onAddLikeSuccess)
    .catch(ui.onAddLikeFailure)
}

const onDeleteLike = (event) => {
  const likeId = $(event.target).data('like-id')
  const photoId = $(event.target).data('id')
  api.deleteLike(likeId)
    .then((response) => {
      ui.onDeleteLikeSuccess(response, photoId)
    })
    .catch(ui.onDeleteLikeFailure)
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
  onDeleteComment,
  onFilterFn,
  onFilterUser,
  onAddLike,
  onDeleteLike
}
