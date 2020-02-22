'use strict'

const timeDiff = (created, updated) => {
  const timeNow = Date.now()
  const timeCreated = new Date(created)
  const timeUpdated = new Date(updated)
  const timeDiff = timeNow - timeUpdated

  if (timeUpdated - timeCreated === 0) {
    return `Posted ${timeString(timeDiff)}`
  } else {
    return `Updated ${timeString(timeDiff)}`
  }
}

const timeString = (timeDiff) => {
  let timeScale
  if (timeDiff < 60000) {
    return 'a few seconds ago'
  } else if (timeDiff < 3600000) {
    const mins = (timeDiff / 60000).toFixed()
    if (mins === '1') {
      timeScale = 'min'
    } else {
      timeScale = 'mins'
    }
    return `${mins} ${timeScale} ago`
  } else if (timeDiff < 86400000) {
    const hours = (timeDiff / 3600000).toFixed()
    if (hours === '1') {
      timeScale = 'hour'
    } else {
      timeScale = 'hours'
    }
    return `${hours} ${timeScale} ago`
  } else if (timeDiff < 31536000000) {
    const days = (timeDiff / 86400000).toFixed()
    if (days === '1') {
      timeScale = 'day'
    } else {
      timeScale = 'days'
    }
    return `${days} ${timeScale} ago`
  } else {
    const years = (timeDiff / 31536000000).toFixed()
    if (years === '1') {
      timeScale = 'year'
    } else {
      timeScale = 'years'
    }
    return `${years} ${timeScale} ago`
  }
}
module.exports = timeDiff
