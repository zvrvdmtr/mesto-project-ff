import {putLike, deleteLike} from '../scripts/api.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(card, removeCardCallback, likeCardCallback, cardPopupCallback, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')
    const button = cardElement.querySelector('.card__delete-button')
    const likeButton = cardElement.querySelector('.card__like-button')
    const numberElement = cardElement.querySelector('.card__like-number')

    if (userId === card.owner["_id"]) {
        button.addEventListener('click', removeCardCallback(card["_id"], cardElement))
    } else {
        button.remove()
    }

    cardImage.src = card.link
    cardImage.alt = card.name
    cardElement.querySelector('.card__title').textContent = card.name;
    numberElement.textContent = card.likes.length;
    likeButton.addEventListener('click', likeCardCallback(card["_id"], likeButton, numberElement))
    cardElement.querySelector('.card__image').addEventListener('click', cardPopupCallback)

    card.likes.forEach(element => {
        if (element["_id"] === userId) {
            cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active')
        } 
     });
    return cardElement
}

export function likeCard(cardId, likeButton, numberElement) {
    return function () {
        if (!likeButton.classList.contains('card__like-button_is-active')) {
            putLike(cardId)
            .then((res) => {
                likeButton.classList.add('card__like-button_is-active')
                numberElement.textContent = res.likes.length
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            deleteLike(cardId)
            .then((res) => {
                likeButton.classList.remove('card__like-button_is-active')
                numberElement.textContent = res.likes.length
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}