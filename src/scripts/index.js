import '../pages/index.css';
import {createCard, removeCard, likeCard} from '../scripts/card.js';
import {enableValidation, clearValidation} from '../scripts/validation.js';
import {openModal, closeModal, setClosePopupListeners} from '../scripts/modals.js';
import {getProfileData, getCards, updateProfileData, addNewCard, updateAvatar} from '../scripts/api.js';

// @todo: DOM узлы
const placesContainer = document.querySelector('.places__list')
const addCardButton = document.querySelector('.profile__add-button')
const editProfileButton = document.querySelector('.profile__edit-button')
const addCardPopup = document.querySelector('.popup_type_new-card')
const editProfilePopup = document.querySelector('.popup_type_edit')
const updateAvatarPopup = document.querySelector('.popup_type_update_avatar')
const imagePopup = document.querySelector('.popup_type_image')
const profileForm = document.forms['edit-profile']
const avatarForm = document.forms['edit-avatar']
const nameInput = profileForm.name
const descriptionInput = profileForm.description
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')
const profileImageHover = document.querySelector('.profile__image_hover')
const addPlaceForm = document.forms['new-place']
const placeNameInput = addPlaceForm['place-name']
const placeLinkInput = addPlaceForm['link']
const avatarUrlInput = avatarForm['avatar']
const cardRemovePopup = document.querySelector('.popup_type_card-remove')

const renderProfile = (profileData) => {
    profileData.then((profile) => {
        profileTitle.textContent = profile.name
        profileDescription.textContent = profile.about
        profileImage.style.backgroundImage = `url(${profile.avatar})`
    })
}

const renderCards = (profileData, cardsData) => {
    Promise.all([profileData, cardsData])
    .then(([profile, cards]) => {
        cards.forEach((card) => {
            placesContainer.append(
                createCard(
                    card,
                    removeCard(card["_id"], cardRemovePopup),
                    likeCard(card["_id"]),
                    cardPopupCallback,
                    profile["_id"]
            ))
        })
    })
}

renderProfile(getProfileData())
renderCards(getProfileData(), getCards())


const cardPopupCallback = (evt) => {
    const image = imagePopup.querySelector('.popup__image')
    image.src = evt.target.src
    image.alt = evt.target.alt
    imagePopup.querySelector('.popup__caption').textContent = evt.target.alt
    openModal(imagePopup)
}

addCardButton.addEventListener('click', () => {
    clearValidation(addPlaceForm, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    })
    openModal(addCardPopup)
})

profileImageHover.addEventListener("click", () => {
    clearValidation(addPlaceForm, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    })
    openModal(updateAvatarPopup)
})

editProfileButton.addEventListener('click', () => {
    clearValidation(profileForm, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    })
    nameInput.value = profileTitle.textContent
    descriptionInput.value = profileDescription.textContent
    openModal(editProfilePopup)
})

setClosePopupListeners(addCardPopup)
setClosePopupListeners(editProfilePopup)
setClosePopupListeners(imagePopup)
setClosePopupListeners(cardRemovePopup)
setClosePopupListeners(updateAvatarPopup)

profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const submitButton = evt.target.querySelector('.popup__button')
    submitButton.textContent = 'Сохранение...'
    profileTitle.textContent = nameInput.value
    profileDescription.textContent = descriptionInput.value
    updateProfileData({
        name: nameInput.value,
        about: descriptionInput.value
    })
    .finally(() => {
        submitButton.textContent = 'Сохранить'
    })
    closeModal(editProfilePopup)
})

addPlaceForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    Promise.all([
        addNewCard({
            name: placeNameInput.value,
            link: placeLinkInput.value
        }),
        getProfileData()
    ])
    .then(([card, profile]) => {
        placesContainer.prepend(
            createCard(
                card,
                removeCard(card["_id"], cardRemovePopup),
                likeCard(card["_id"]),
                cardPopupCallback,
                profile["_id"]
            )
        )
        addPlaceForm.reset()
        closeModal(addCardPopup)  
    })
})

avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    updateAvatar({
        avatar: avatarUrlInput.value
    })
    .then(() => {
        profileImage.style.backgroundImage = `url(${avatarUrlInput.value})`
    })
    .finally(() =>{
        closeModal(updateAvatarPopup)
    })
})

// @todo: Вывести карточки на страницу
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
