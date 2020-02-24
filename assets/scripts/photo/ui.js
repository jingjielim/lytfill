'use strict'

const showPhotosTemplate = require('../templates/photo-listings.handlebars')
const showPhotoTemplate = require('../templates/photo-show.handlebars')
const editPhotoTemplate = require('../templates/update-photo.handlebars')
const sharePhotoTemplate = require('../templates/share-photo.handlebars')
const signInNavTemplate = require('../templates/signed-in-nav.handlebars')
const commentTemplate = require('../templates/render-new-comment.handlebars')
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
  $('.navbar').html(signInNavTemplate({user: store.user.name}))
}

const onGetPhotosSuccess = (data) => {
  // store.photos = data.photos
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
  const showPhotoHtml = showPhotoTemplate({photo: response.photo, currentUser: store.user})
  $('.content').html(showPhotoHtml)
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
  // store.editPhotoId = response.photo.id
  $('.content').html(editPhotoHtml)
}

const onEditPhotoFailure = (response) => {
  const msg = `Failed to get photo to edit`
  const type = 'edit-photos-f'
  const state = 'danger'
  sysMsg(type, state, msg)
}

const onUpdatePhotoSuccess = (response) => {
  // store.editPhotoId = null
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
  onDeleteCommentFailure
}
