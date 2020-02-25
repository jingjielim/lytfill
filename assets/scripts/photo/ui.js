'use strict'

const showPhotosTemplate = require('../templates/photo-listings.handlebars')
const showPhotoTemplate = require('../templates/photo-show.handlebars')
const editPhotoTemplate = require('../templates/update-photo.handlebars')
const sharePhotoTemplate = require('../templates/share-photo.handlebars')
const signInNavTemplate = require('../templates/signed-in-nav.handlebars')
const commentTemplate = require('../templates/render-new-comment.handlebars')
const filterTemplate = require('../templates/filter-template.handlebars')
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
  $('#filters').empty()
  $('.navbar').html(signInNavTemplate({user: store.user.name}))
}

const onGetPhotosSuccess = (data) => {
  // Initialise isotope
  const $grid = $('.photos').isotope({
    itemSelector: '.grid-item'
  })
  // Remove all the previous isotope elements as it will be overwritten
  const $photoContainer = $('.photos')
  $photoContainer.isotope('remove', $photoContainer.isotope('getItemElements'))
  // Check if there is a current user
  let isSignedIn = false
  if (store.user) {
    isSignedIn = true
  }
  // Based on current user status, render the filter options
  const filterHtml = filterTemplate({isSignedIn: isSignedIn})
  $('#filters').html(filterHtml)
  // Render the photos and append to isotope node
  const showPhotosHtml = showPhotosTemplate({photos: data.photos})
  $('.content').html(showPhotosHtml)
  $photoContainer.isotope('appended', $photoContainer)

  // Wait for photos to load and then layout the images nicely
  $grid.imagesLoaded().progress(function () {
    $grid.isotope('layout')
  })
  // Remove all filters on the photos for new image feed
  $grid.isotope({ filter: `*` })
}

const onGetPhotosFailure = (response) => {
  const msg = `Failed to get Photos`
  const type = 'get-photos-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onGetPhotoSuccess = (response) => {
  const showPhotoHtml = showPhotoTemplate({photo: response.photo, currentUser: store.user})
  $('.content').html(showPhotoHtml)
  $('#filters').empty()
  onGetPhotoComments(response)
}

const onGetPhotoComments = (response) => {
  let showCommentsHtml = ''
  response.photo.comments.forEach(comment => {
    const commentHtml = commentTemplate({comment: comment, isUserOwner: (comment.owner === store.user.name)})
    showCommentsHtml += (commentHtml)
  })
  $('.comments').append(showCommentsHtml)
}

const onGetPhotoFailure = (response) => {
  const msg = `Failed to get photo`
  const type = 'get-photo-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onCreatePhotoSuccess = (response) => {
  const msg = `Uploaded photo`
  const type = 'create-photo-s'
  const state = 'success'
  sysMsg(type, state, msg)
  $('.create-photo-form').trigger('reset')
}

const onCreatePhotoFailure = (response) => {
  const msg = `Failed to create new photo`
  const type = 'create-photo-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onDeletePhotoSuccess = (response) => {
  const msg = `Photo deleted`
  const type = 'delete-photo-s'
  const state = 'success'
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
  $('.content').html(editPhotoHtml)
  $('#filters').empty()
}

const onEditPhotoFailure = (response) => {
  const msg = `Failed to get photo to edit`
  const type = 'edit-photos-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onUpdatePhotoSuccess = (response) => {
  $('.update-photo-form').empty()
  const msg = `Post updated!`
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

const onAddCommentSuccess = (response) => {
  $('.comment-form').trigger('reset')
  const newCommentHtml = commentTemplate({comment: response.comment, isUserOwner: (response.comment.owner === store.user.name)})
  $('.comments').append(newCommentHtml)
}

const onAddCommentFailure = (response) => {
  const msg = `Failed to add comment`
  const type = 'add-comment-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onDeleteCommentSuccess = (response) => {
  const msg = `Comment deleted`
  const type = 'add-comment-f'
  const state = 'success'
  sysMsg(type, state, msg)
}

const onDeleteCommentFailure = (response) => {
  const msg = `Failed to delete comment`
  const type = 'delete-comment-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onFilterUserFailure = (response) => {
  const $grid = $('.photos').isotope({
    itemSelector: '.grid-item'
  })
  $grid.isotope({ filter: `*` })

  const msg = `Error: User has not uploaded photos or User not found`
  const type = 'get-photo-f'
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
  onDeletePhotoSuccess,
  onDeletePhotoFailure,
  onEditPhotoSuccess,
  onEditPhotoFailure,
  onUpdatePhotoSuccess,
  onUpdatePhotoFailure,
  onSharePhoto,
  onAddCommentSuccess,
  onAddCommentFailure,
  onDeleteCommentSuccess,
  onDeleteCommentFailure,
  onFilterUserFailure
}
