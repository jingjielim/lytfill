'use strict'

const showPhotosTemplate = require('../templates/photo-listings.handlebars')
const showPhotoTemplate = require('../templates/photo-show.handlebars')
const editPhotoTemplate = require('../templates/update-photo.handlebars')
const sharePhotoTemplate = require('../templates/share-photo.handlebars')
const signInNavTemplate = require('../templates/signed-in-nav.handlebars')
const signOutNavTemplate = require('../templates/signed-out-nav.handlebars')
const commentTemplate = require('../templates/render-new-comment.handlebars')
const filterTemplate = require('../templates/filter-template.handlebars')
const likeIconTemplate = require('../templates/like-icon.handlebars')
const likeWordTemplate = require('../templates/like-word.handlebars')
const store = require('../store')

const onPageLoadSuccess = (response, $grid) => {
  store.data = response
  const $photoContainer = $('.photos')
  let indexPhotosHtml = ''
  // For each photo, need to know if photo has been liked by current user and the like Id
  response.photos.forEach(photo => {
    const isLikedByUser = false
    const likeId = null
    // Check if there is more than 1 like
    const isLikePlural = photo.num_likes > 1
    // Check if there is more than 1 comment
    const isComPlural = photo.num_comments > 1
    // Render photo's card
    const photoCard = showPhotosTemplate({photo: photo, isSignedIn: false, isLikedByUser: isLikedByUser, likeId: likeId, isLikePlural: isLikePlural, isComPlural: isComPlural})
    // Add to the list of photo cards
    indexPhotosHtml += photoCard
  })
  $('.content').html(indexPhotosHtml)
  $grid.isotope('appended', $photoContainer)
  $photoContainer.imagesLoaded().progress(function () {
    $grid.isotope('layout')
  })
  $photoContainer.imagesLoaded().done(function () {
    $grid.isotope('shuffle')
  })
  $('.navbar').html(signOutNavTemplate())
  const filterHtml = filterTemplate({isSignedIn: false})
  $('#filters').html(filterHtml)
}
const onSharePhoto = () => {
  $('.content').html(sharePhotoTemplate()).attr('style', 'height: auto;')
  $('#filters').empty()
  $('.navbar').html(signInNavTemplate({user: store.user.name}))
}

const onGetPhotosSuccess = (response, $grid) => {
  store.data = response
  // Remove all the previous isotope elements as it will be overwritten
  // const $photoContainer = $('.photos')
  // $photoContainer.isotope('remove', $photoContainer.isotope('getItemElements'))
  // Check if there is a current user
  let isSignedIn = false
  if (store.user) {
    isSignedIn = true
  }
  // Based on current user status, render the filter options
  const filterHtml = filterTemplate({isSignedIn: isSignedIn})
  $('#filters').html(filterHtml)
  // Render the photos and append to isotope node
  let indexPhotosHtml = ''
  // For each photo, need to know if photo has been liked by current user and the like Id
  response.photos.forEach(photo => {
    let isLikedByUser = false
    let likeId = null
    let likeClass = null
    // Check if there is a current user
    if (store.user) {
      // Check if current user has liked photo
      const foundUserLiked = photo.likes.find(like => like['owner'] === store.user.name)
      // If it has been liked by user then take down the likeId
      if (foundUserLiked) {
        isLikedByUser = true
        likeId = foundUserLiked['id']
        likeClass = 'likedByUser'
      }
    }
    // Check if there is more than 1 like
    const isLikePlural = photo.num_likes > 1
    // Check if there is more than 1 comment
    const isComPlural = photo.num_comments > 1
    // Render photo's card
    const photoCard = showPhotosTemplate({photo: photo, isSignedIn: isSignedIn, isLikedByUser: isLikedByUser, likeId: likeId, isLikePlural: isLikePlural, isComPlural: isComPlural, likeClass: likeClass})
    // Add to the list of photo cards
    indexPhotosHtml += photoCard
  })
  // Render all cards at once
  $('.content').html(indexPhotosHtml).attr('style', 'position:relative; height: auto;')
  // Append the cards to isotope again
  $grid.isotope('reloadItems')
  // $grid.isotope('appended', $photoContainer)
  // $photoContainer.imagesLoaded().done(function () {
  //   $grid.isotope('shuffle')
  // })
  // Remove all filters on the photos for new image feed
  $grid.isotope({ filter: `*` })
  window.scrollTo(0, 0)
}

const onGetPhotosFailure = (response) => {
  const msg = `Failed to get Photos`
  const type = 'get-photos-f'
  failureMsg(type, msg)
}

const onGetPhotoSuccess = (response) => {
  const showPhotoHtml = showPhotoTemplate({photo: response.photo, currentUser: store.user})
  $('.content').html(showPhotoHtml).attr('style', 'position: relative; height: auto;')
  $('#filters').empty()
  onGetPhotoComments(response)
  window.scrollTo(0, 0)
}

const onGetPhotoComments = (response) => {
  let showCommentsHtml = ''
  let username
  if (store.user) {
    username = store.user.name
  } else {
    username = null
  }
  response.photo.comments.forEach(comment => {
    const isUserOwner = (username === comment.owner)
    const commentHtml = commentTemplate({comment: comment, isUserOwner: isUserOwner})
    showCommentsHtml += (commentHtml)
  })
  $('.comments').append(showCommentsHtml)
}

const onGetPhotoFailure = (response) => {
  const msg = `Failed to get photo`
  const type = 'get-photo-f'
  failureMsg(type, msg)
}

const onCreatePhotoSuccess = (response) => {
  const msg = `Uploaded photo`
  const type = 'create-photo-s'
  successMsg(type, msg)
  $('.create-photo-form').trigger('reset')
}

const onCreatePhotoFailure = (response) => {
  const msg = `Failed to create new photo`
  const type = 'create-photo-f'
  failureMsg(type, msg)
}

const onDeletePhotoSuccess = (response) => {
  const msg = `Photo deleted`
  const type = 'delete-photo-s'
  successMsg(type, msg)
}

const onDeletePhotoFailure = (response) => {
  const msg = `Failed to delete photo`
  const type = 'del-photos-f'
  failureMsg(type, msg)
}

const onEditPhotoSuccess = (response) => {
  const editPhotoHtml = editPhotoTemplate({photo: response.photo})
  $('.content').html(editPhotoHtml).attr('style', 'height: auto;')
  $('#filters').empty()
  window.scrollTo(0, 0)
}

const onEditPhotoFailure = (response) => {
  const msg = `Failed to get photo to edit`
  const type = 'edit-photos-f'
  failureMsg(type, msg)
}

const onUpdatePhotoSuccess = (response) => {
  $('.update-photo-form').empty()
  const msg = `Post updated!`
  const type = 'update-photos-s'
  successMsg(type, msg)
}

const onUpdatePhotoFailure = (response) => {
  const msg = `Failed to update photo`
  const type = 'update-photos-f'
  failureMsg(type, msg)
}

const onAddCommentSuccess = (response) => {
  $('.comment-form').trigger('reset')
  const newCommentHtml = commentTemplate({comment: response.comment, isUserOwner: (response.comment.owner === store.user.name)})
  $('.comments').append(newCommentHtml)
}

const onAddCommentFailure = (response) => {
  const msg = `Failed to add comment`
  const type = 'add-comment-f'
  failureMsg(type, msg)
}

const onDeleteCommentSuccess = (response) => {
  const msg = `Comment deleted`
  const type = 'add-comment-f'
  successMsg(type, msg)
}

const onDeleteCommentFailure = (response) => {
  const msg = `Failed to delete comment`
  const type = 'delete-comment-f'
  failureMsg(type, msg)
}

const onFilterUserFailure = ($grid) => {
  $grid.isotope({ filter: `*` })

  const msg = `Error: User has not uploaded photos or User not found`
  const type = 'get-photo-f'
  failureMsg(type, msg)
}

const onAddLikeSuccess = (getPhotoRes, addLikeRes, $grid) => {
  const photoId = getPhotoRes.photo.id
  const likeId = addLikeRes.like.id
  const numLikes = getPhotoRes.photo.num_likes
  const isPlural = numLikes > 1

  const likeIconHtml = likeIconTemplate({isLikedByUser: true, likeId: likeId, photoId: photoId})
  $(`#like-icon-${photoId}`).html(likeIconHtml)

  const likeWordHtml = likeWordTemplate({isPlural: isPlural, numLikes: numLikes, photoId: photoId})
  $(`.like-word-${photoId}`).html(likeWordHtml)
  $(`.grid-item.${photoId}`).addClass('likedByUser')
  $grid.isotope('updateSortData').isotope()
  // $grid.isotope('reloadItems').isotope()
}

const onAddLikeFailure = (response) => {
  const msg = `Error: Could not like photo :(`
  const type = 'get-photo-f'
  failureMsg(type, msg)
}

const onDeleteLikeSuccess = (getPhotoRes, delLikeRes, $grid) => {
  const photoId = getPhotoRes.photo.id
  const numLikes = getPhotoRes.photo.num_likes
  const likeIconHtml = likeIconTemplate({isLikedByUser: false, photoId: photoId})
  $(`#like-icon-${photoId}`).html(likeIconHtml)
  const isPlural = numLikes > 1
  const likeWordHtml = likeWordTemplate({isPlural: isPlural, numLikes: numLikes, photoId: photoId})
  $(`.like-word-${photoId}`).html(likeWordHtml)
  $(`.grid-item.${photoId}`).removeClass('likedByUser')
  $grid.isotope('updateSortData').isotope()
  // $grid.isotope('reloadItems').isotope()
}

const onDeleteLikeFailure = (response) => {
  const msg = `Error: Could not unlike photo :(`
  const type = 'get-photo-f'
  failureMsg(type, msg)
}

const onPreviewPhotoSuccess = (photoUrl) => {
  $('.preview-img').attr('src', photoUrl).addClass('img-thumbnail')
}

const onPreviewPhotoFailure = () => {
  const msg = `Error: Please enter a Url`
  const type = 'preview-photo-f'
  failureMsg(type, msg)
}

const msgHtml = (type, msg) => {
  return `<div class="${type} alert row alert-dismissible fade show" role="alert"> ${msg} <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button> </div>`
}

const successMsg = (type, msg) => {
  $('.sys-message').append(msgHtml(type, msg))
  $(`.${type}`).addClass(`alert-success`)
  setTimeout(() => {
    $(`.${type}`).remove()
  }, 5000)
}
const failureMsg = (type, msg) => {
  $('.sys-message').append(msgHtml(type, msg))
  $(`.${type}`).addClass(`alert-danger`)
  setTimeout(() => {
    $(`.${type}`).remove()
  }, 5000)
}

module.exports = {
  onPageLoadSuccess,
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
  onFilterUserFailure,
  onAddLikeSuccess,
  onAddLikeFailure,
  onDeleteLikeSuccess,
  onDeleteLikeFailure,
  onPreviewPhotoSuccess,
  onPreviewPhotoFailure
}
