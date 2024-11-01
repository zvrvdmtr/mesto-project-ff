const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
    headers: {
      authorization: 'b5cd6d55-26d0-4f2f-83ba-d0df94f80042',
      'Content-Type': 'application/json ',
    }
  }

export function getProfileData() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка:${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
}

export function updateProfileData(profileData) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(profileData)
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        console.log(res)
        return Promise.reject(`Ошибка:${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
}

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка:${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
}

export function addNewCard(cardData) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(cardData)
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка:${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка:${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
}

export function putLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка:${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
}

export function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка:${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
}

export function updateAvatar(avatarData) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(avatarData)
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка:${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
}