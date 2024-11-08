import '../pages/index.css';
import {createCard, likeCard} from '../scripts/card.js';
import {enableValidation, clearValidation} from '../scripts/validation.js';
import {openModal, closeModal, setClosePopupListeners} from '../scripts/modals.js';
import {getProfileData, getCards, updateProfileData, addNewCard, updateAvatar, deleteCard} from '../scripts/api.js';

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
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
let profileId = ""
let cardForDelete = {}


// @todo: Функция удаления карточки
export function removeCard(cardId, cardElement) {
    return function() {
        cardForDelete = {
            id: cardId,
            cardElement
          }
          openModal(cardRemovePopup);
    }
}


cardRemovePopup.querySelector('.popup__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    if (!cardForDelete.cardElement) {
        return
    }

    deleteCard(cardForDelete.id)
    .then(() => {
        console.log(cardForDelete.cardElement)
        cardForDelete.cardElement.remove();
        closeModal(cardRemovePopup);
        cardForDelete = {};
    })
    .catch((err) => {
        console.log(err)
    })
})


const renderProfile = (profile) => {
    profileId = profile["_id"]
    profileTitle.textContent = profile.name
    profileDescription.textContent = profile.about
    profileImage.style.backgroundImage = `url(${profile.avatar})`
}

const renderCards = (cards) => {
    cards.forEach((card) => {
        placesContainer.append(
            createCard(
                card,
                removeCard,
                likeCard,
                cardPopupCallback,
                profileId
        ))
    })
}

Promise.all([getProfileData(), getCards()])
.then(([profileData, cards]) => {
    renderProfile(profileData)
    renderCards(cards)
})
.catch((err) => {
    console.log(err)
})


const cardPopupCallback = (evt) => {
    const image = imagePopup.querySelector('.popup__image')
    image.src = evt.target.src
    image.alt = evt.target.alt
    imagePopup.querySelector('.popup__caption').textContent = evt.target.alt
    openModal(imagePopup)
}

addCardButton.addEventListener('click', () => {
    addPlaceForm.reset()
    clearValidation(addPlaceForm, validationConfig)
    openModal(addCardPopup)
})

profileImageHover.addEventListener("click", () => {
    avatarForm.reset()
    clearValidation(avatarForm, validationConfig)
    openModal(updateAvatarPopup)
})

editProfileButton.addEventListener('click', () => {
    clearValidation(profileForm, validationConfig)
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
    .then(() => {
        closeModal(editProfilePopup)
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        submitButton.textContent = 'Сохранить'
    })
})

addPlaceForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    addNewCard({
        name: placeNameInput.value,
        link: placeLinkInput.value
    })
    .then((card) => {
        placesContainer.prepend(
            createCard(
                card,
                removeCard,
                likeCard,
                cardPopupCallback,
                profileId
            )
        )
        addPlaceForm.reset()
        closeModal(addCardPopup)
    })
    .catch((err) => {
        console.log(err)
    })
})

avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    updateAvatar({
        avatar: avatarUrlInput.value
    })
    .then(() => {
        profileImage.style.backgroundImage = `url(${avatarUrlInput.value})`
        closeModal(updateAvatarPopup)
    })
    .catch((err) => {
        console.log(err)
    })
})

enableValidation(validationConfig);
