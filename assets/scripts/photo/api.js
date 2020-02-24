const config = require('../config')
const store = require('../store')

const getPhotos = () => {
  let auth
  if (store.user) {
    auth = {
      Authorization: 'Token token=' + store.user.token
    }
  } else {
    auth = 'none'
  }

  return $.ajax({
    url: config.apiUrl + '/photos',
    method: 'GET',
    headers: auth
  })
}

const getPhoto = (photoId) => {
  let auth
  if (store.user) {
    auth = {
      Authorization: 'Token token=' + store.user.token
    }
  } else {
    auth = 'none'
  }
  return $.ajax({
    url: config.apiUrl + '/photos/' + photoId,
    method: 'GET',
    headers: auth
  })
}

const createPhoto = (photoData) => {
  return $.ajax({
    url: config.apiUrl + '/photos',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: photoData
  })
}

const deletePhoto = (photoId) => {
  return $.ajax({
    url: config.apiUrl + '/photos/' + photoId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updatePhoto = (photoData, photoId) => {
  return $.ajax({
    url: config.apiUrl + '/photos/' + photoId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: photoData
  })
}

const addComment = (commentData) => {
  return $.ajax({
    url: config.apiUrl + '/comments',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: commentData
  })
}

const deleteComment = (commentId) => {
  return $.ajax({
    url: config.apiUrl + '/comments/' + commentId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getPhotos,
  createPhoto,
  deletePhoto,
  getPhoto,
  updatePhoto,
  addComment,
  deleteComment
}
