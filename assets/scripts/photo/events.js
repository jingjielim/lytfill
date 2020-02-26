'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const addEventListeners = ($grid) => {
  $('.navbar').on('click', '.share-photo', onSharePhoto)
  $('.navbar').on('click', '.navbar-brand', (event) => {
    onGetPhotos(event, $grid)
  })
  $('.content').on('click', '.preview', onPreviewPhoto)
  $('.content').on('submit', '.create-photo-form', onCreatePhoto)
  $('.content').on('click', '.edit-photo-btn', onEditPhoto)
  $('.content').on('submit', '.update-photo-form', onUpdatePhoto)
  $('.content').on('click', '.delete-photo-btn', onDeletePhoto)
  $('.content').on('submit', '.comment-form', onAddComment)
  $('.content').on('click', '.delete-comment-btn', onDeleteComment)
  $('.content').on('click', '.add-like-btn', onAddLike)
  $('.content').on('click', '.delete-like-btn', onDeleteLike)
  $('.content').on('click', '.card-img-top', onGetPhoto)
  $('.content').on('click', '.fa-comment', onGetPhoto)
  $('#filters').on('click', '.filter-btn', (event) => {
    onFilterFn(event, $grid)
  })
  $('#filters').on('submit', '.user-search-form', (event) => {
    onFilterUser(event, $grid)
  })
  $('#filters').on('click', '.sort-btn', (event) => {
    onSortFn(event, $grid)
  })
  $('#filters').on('click', '.shuffle-btn', (event) => {
    onShuffle(event, $grid)
  })
}

const onPageLoad = ($grid) => {
  store.user = null
  api.getPhotos()
    .then((response) => {
      ui.onPageLoadSuccess(response, $grid)
    })
    .catch(ui.onPageLoadFailure)
}

const onSharePhoto = (event) => {
  event.preventDefault()
  ui.onSharePhoto()
}

const onGetPhotos = (event, $grid) => {
  api.getPhotos()
    .then((response) => {
      ui.onGetPhotosSuccess(response, $grid)
    })
    .catch(ui.onGetPhotosFailure)
}

const onPreviewPhoto = () => {
  if ($('.photo-url').val()) {
    ui.onPreviewPhotoSuccess($('.photo-url').val())
  } else {
    ui.onPreviewPhotoFailure()
  }
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

const onDeletePhoto = (event) => {
  event.preventDefault()

  const photoId = $(event.target).data('id')
  api.deletePhoto(photoId)
    .then(() => { onGetPhotos(event) })
    .catch(ui.onDeletePhotoFailure)
}

const onAddComment = (event) => {
  event.preventDefault()

  const form = event.target
  const commentData = getFormFields(form)
  api.addComment(commentData)
    .then(ui.onAddCommentSuccess)
    .catch(ui.onAddCommentFailure)
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

const onAddLike = (event) => {
  const photoId = $(event.target).data('id')
  api.addLike(photoId)
    .then((addLikeRes) => {
      api.getPhoto(photoId)
        .then((getPhotoRes) => {
          ui.onAddLikeSuccess(getPhotoRes, addLikeRes)
        })
        .catch(ui.onGetPhotoFailure)
    })
    .catch(ui.onAddLikeFailure)
}

const onDeleteLike = (event) => {
  const likeId = $(event.target).data('like-id')
  const photoId = $(event.target).data('id')
  api.deleteLike(likeId)
    .then((delLikeRes) => {
      api.getPhoto(photoId)
        .then((getPhotoRes) => {
          ui.onDeleteLikeSuccess(getPhotoRes, delLikeRes)
        })
        .catch(ui.onGetPhotoFailure)
    })
    .catch(ui.onDeleteLikeFailure)
}

const onFilterFn = (event, $grid) => {
  let filterValue = $(event.target).data('filter')
  if (filterFns[filterValue]) {
    filterValue = filterFns[filterValue]()
  }
  $grid.isotope({ filter: filterValue })
}

const onFilterUser = (event, $grid) => {
  event.preventDefault()
  const form = event.target
  const userData = getFormFields(form)
  $('.user-search-form').trigger('reset')
  console.log(userData)
  if (userData.user.name) {
    $grid.isotope({ filter: `.${userData.user.name}` })
  }
  // If nothing found based on search term return an error
  if (!$('.photos').isotope('getFilteredItemElements').length) {
    ui.onFilterUserFailure($grid)
  }
}

const onSortFn = (event, $grid) => {
  const sortValue = $(event.target).data('sort-value')
  console.log(sortValue)
  $grid.isotope({ sortBy: sortValue, sortAscending: false })
}

const onShuffle = (event, $grid) => {
  $grid.isotope('shuffle')
}

const filterFns = {
  myPhotos: function () {
    return `.${store.user.name}`
  },
  notMyPhotos: function () {
    return `:not('.${store.user.name}')`
  },
  likedByUser: function () {
    return '.likedByUser'
  },
  all: function () {
    return '*'
  }
}

module.exports = {
  onPageLoad,
  addEventListeners,
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
