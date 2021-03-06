'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const config = require('../config')

const addEventListeners = ($grid) => {
  $('.navbar').on('click', '.share-photo', onSharePhoto)
  $('.navbar').on('click', '.navbar-brand', (event) => onGetPhotos(event, $grid))
  $('.content').on('click', '.preview', onPreviewPhoto)
  $('.content').on('submit', '.create-photo-form', (event) => onCreatePhoto(event, $grid))
  $('.content').on('click', '.edit-photo-btn', onEditPhoto)
  $('.content').on('submit', '.update-photo-form', (event) => onUpdatePhoto(event, $grid))
  $('.content').on('click', '.delete-photo-btn', (event) => onDeletePhoto(event, $grid))
  $('.content').on('submit', '.comment-form', onAddComment)
  $('.content').on('click', '.delete-comment-btn', onDeleteComment)
  $('.content').on('click', '.add-like-btn', (event) => onAddLike(event, $grid))
  $('.content').on('click', '.delete-like-btn', (event) => onDeleteLike(event, $grid))
  $('.content').on('click', '.card-img-top', onGetPhoto)
  $('.content').on('click', '.fa-comment', onGetPhoto)
  $('.content').on('click', '.home', (event) => onGetPhotos(event, $grid))
  $('#filters').on('click', '.filter-btn', (event) => onFilterFn(event, $grid))
  $('#filters').on('submit', '.user-search-form', (event) => onFilterUser(event, $grid))
  $('#filters').on('click', '.sort-btn', (event) => onSortFn(event, $grid))
  $('#filters').on('click', '.shuffle-btn', (event) => onShuffle(event, $grid))
  $('.content').on('click', '.next-page', (event) => onNextPage(event, $grid))
  $('.content').on('change', '#newFile', onSelectFile)
}
const onSelectFile = event => {
  if (event.target.files[0].type === 'image/jpeg') {
    $('#upload-file').html(event.target.files[0].name)
    store.file = event.target.files[0]
  } else {
    $('#upload-file').html('Only jpeg files allowed')
    store.file = null
  }
}

const onUploadFile = async (event) => {
  const payload = await fetch(`${config.apiUrl}/s3/direct_post`).then(res => {
    console.log(res)
    return res.json()
  })
  const url = payload.url
  const formData = new FormData()
  Object.keys(payload.fields).forEach(key =>
    formData.append(key, payload.fields[key])
  )
  formData.append('file', store.file)
  const xml = await fetch(url, {
    method: 'POST',
    body: formData
  }).then(res => res.text())
  const uploadUrl = new DOMParser()
    .parseFromString(xml, 'application/xml')
    .getElementsByTagName('Location')[0].textContent
  return uploadUrl
}

const onPageLoad = ($grid) => {
  store.user = null
  api.getPhotos()
    .then((response) => {
      ui.onPageLoadSuccess(response, $grid)
    })
    .catch(ui.onPageLoadFailure)
}

const onGetPhotos = (event, $grid) => {
  api.getPhotos()
    .then((response) => {
      ui.onGetPhotosSuccess(response, $grid)
    })
    .catch(ui.onGetPhotosFailure)
}

const onNextPage = (event, $grid) => {
  api.getNextPage()
    .then((response) => {
      $('.next-page').remove()
      ui.onNextPageSuccessful(response, $grid)
    })
    .catch(ui.onNextPageFailure)
}
const onGetPhoto = (event) => {
  const photoId = $(event.target).data('id')

  api.getPhoto(photoId)
    .then(ui.onGetPhotoSuccess)
    .catch(ui.onGetPhotoFailure)
}

const onCreatePhoto = (event, $grid) => {
  event.preventDefault()
  if (!store.file) {
    console.log('no file selected')
    return
  }
  const form = event.target
  const photoData = getFormFields(form)
  console.log(photoData)
  onUploadFile()
    .then(res => {
      photoData.photo.site = res
      return api.createPhoto(photoData)
    })
    .then(function () {
      ui.onCreatePhotoSuccess()
      onGetPhotos(event, $grid)
    })
    .catch(ui.onCreatePhotoFailure)

  // api.createPhoto(photoData)
  //   .then(function () {
  //     ui.onCreatePhotoSuccess()
  //     onGetPhotos(event, $grid)
  //   })
  //   .catch(ui.onCreatePhotoFailure)
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

const onDeletePhoto = (event, $grid) => {
  event.preventDefault()

  const photoId = $(event.target).data('id')
  api.deletePhoto(photoId)
    .then(() => { onGetPhotos(event, $grid) })
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

const onAddLike = (event, $grid) => {
  const photoId = $(event.target).data('id')
  api.addLike(photoId)
    .then((addLikeRes) => {
      api.getPhoto(photoId)
        .then((getPhotoRes) => {
          ui.onAddLikeSuccess(getPhotoRes, addLikeRes, $grid)
        })
        .catch(ui.onGetPhotoFailure)
    })
    .catch(ui.onAddLikeFailure)
}

const onDeleteLike = (event, $grid) => {
  const likeId = $(event.target).data('like-id')
  const photoId = $(event.target).data('id')
  api.deleteLike(likeId)
    .then((delLikeRes) => {
      api.getPhoto(photoId)
        .then((getPhotoRes) => {
          ui.onDeleteLikeSuccess(getPhotoRes, delLikeRes, $grid)
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

const onSharePhoto = (event) => {
  event.preventDefault()
  ui.onSharePhoto()
}

const onPreviewPhoto = () => {
  if (validURL($('.photo-url').val())) {
    ui.onPreviewPhotoSuccess($('.photo-url').val())
  } else {
    ui.onPreviewPhotoFailure()
  }
}

const validURL = (str) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
  return !!pattern.test(str)
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
