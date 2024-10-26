const openedPopupClass = 'popup_is-opened'

const handleEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector("." + openedPopupClass)
        closeModal(openedPopup)
    }
}

export const openModal = (modal) => {
    modal.classList.add(openedPopupClass)
    document.addEventListener('keydown', handleEscape)
}

export const closeModal = (modal) => {
    modal.classList.remove(openedPopupClass)
    document.removeEventListener('keydown', handleEscape)
}

export const setClosePopupListeners = (popupElement) => {
    const closePopup = popupElement.querySelector('.popup__close')
    closePopup.addEventListener('click', () => {
        closeModal(popupElement)
    })

    popupElement.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(popupElement)
        }
    })
}
