import {openModal, closeModal} from '../scripts/modals.js';
import {deleteCard, putLike, deleteLike } from '../scripts/api.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(card, removeCardCallback, likeCardCallback, cardPopupCallback, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')
    const button = cardElement.querySelector('.card__delete-button')

    if (userId === card.owner["_id"]) {
        button.addEventListener('click', removeCardCallback)
    } else {
        button.remove()
    }

    cardImage.src = card.link
    cardImage.alt = card.name
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__like-number').textContent = card.likes.length;
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCardCallback)
    cardElement.querySelector('.card__image').addEventListener('click', cardPopupCallback)

    card.likes.forEach(element => {
        if (element["_id"] === userId) {
            cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active')
        } 
     });
    return cardElement
}

// @todo: Функция удаления карточки
export function removeCard(cardId, cardRemovePopup) {
    return function(event) {
        openModal(cardRemovePopup)
        cardRemovePopup.querySelector('.popup__button').addEventListener('click', () => {
            deleteCard(cardId)
            .then(() => {
                event.target.closest('.card').remove()
                closeModal(cardRemovePopup)
            })
        })
    }
}

export function likeCard(cardId) {
    return function (event) {
        if (!event.target.classList.contains('card__like-button_is-active')) {
            putLike(cardId)
            .then((res) => {
                event.target.classList.add('card__like-button_is-active')
                const number = event.target.closest('.card').querySelector('.card__like-number')
                number.textContent = res.likes.length
            })
        } else {
            deleteLike(cardId)
            .then((res) => {
                event.target.classList.remove('card__like-button_is-active')
                const number = event.target.closest('.card').querySelector('.card__like-number')
                number.textContent = res.likes.length
            })
        }
    }
}