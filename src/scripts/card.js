// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(location, img, removeCardCallback, likeCardCallback, cardPopupCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')
    cardImage.src = img
    cardImage.alt = location
    cardElement.querySelector('.card__title').textContent = location;
    cardElement.querySelector('.card__delete-button').addEventListener('click', removeCardCallback)
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCardCallback)
    cardElement.querySelector('.card__image').addEventListener('click', cardPopupCallback)
    return cardElement
}

// @todo: Функция удаления карточки
export function removeCard(event) {
    event.target.closest('.card').remove()
}

// @todo: Функция удаления карточки
export function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active')
}