import '../pages/index.css';
import {initialCards} from '../scripts/cards.js';
import {createCard, removeCard, likeCard} from '../scripts/card.js';

import {openModal, closeModal, popupAddEventListener} from '../scripts/popups.js';

// @todo: DOM узлы
const placesContainer = document.querySelector('.places__list')
const addCardButton = document.querySelector('.profile__add-button')
const editProfileButton = document.querySelector('.profile__edit-button')
const addCardPopup = document.querySelector('.popup_type_new-card')
const editProfilePopup = document.querySelector('.popup_type_edit')
const imagePopup = document.querySelector('.popup_type_image')
const profileForm = document.forms['edit-profile']
const nameInput = profileForm.name
const descriptionInput = profileForm.description
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const addPlaceForm = document.forms['new-place']
const placeNameInput = addPlaceForm['place-name']
const placeLinkInput = addPlaceForm['link']

const cardPopupCallback = (evt) => {
    const image = imagePopup.querySelector('.popup__image')
    image.src = evt.target.src
    image.alt = evt.target.alt
    imagePopup.querySelector('.popup__caption').textContent = evt.target.alt
    openModal(imagePopup)
}

addCardButton.addEventListener('click', () => {
    openModal(addCardPopup)
})

editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent
    descriptionInput.value = profileDescription.textContent
    openModal(editProfilePopup)
})

popupAddEventListener(addCardPopup)
popupAddEventListener(editProfilePopup)
popupAddEventListener(imagePopup)

profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    profileTitle.textContent = nameInput.value
    profileDescription.textContent = descriptionInput.value
    closeModal(editProfilePopup)
})

addPlaceForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    placesContainer.prepend(createCard(placeNameInput.value, placeLinkInput.value, removeCard))
    placeNameInput.value = ''
    placeLinkInput.value = ''
    closeModal(addCardPopup)
})

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => placesContainer.append(createCard(item.name, item.link, removeCard, likeCard, cardPopupCallback)))