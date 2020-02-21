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

module.exports = {
  getPhotos,
  createPhoto
}
