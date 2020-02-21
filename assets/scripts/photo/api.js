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
  return $.ajax({
    url: config.apiUrl + '/photos/' + photoId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
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

const updatePhoto = (photoData) => {
  return $.ajax({
    url: config.apiUrl + '/photos/' + store.editPhotoId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: photoData
  })
}

module.exports = {
  getPhotos,
  createPhoto,
  deletePhoto,
  getPhoto,
  updatePhoto
}
