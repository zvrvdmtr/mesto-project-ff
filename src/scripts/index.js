// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesContainer = document.querySelector('.places__list')

// @todo: Функция создания карточки
function createCard(location, img, removeCardCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image')
    cardImage.src = img
    cardImage.alt = location
    cardElement.querySelector('.card__title').textContent = location;
    cardElement.querySelector('.card__delete-button').addEventListener('click', removeCardCallback)
    return cardElement
}

// @todo: Функция удаления карточки
function removeCard(event) {
    event.target.closest('.card').remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => placesContainer.append(createCard(item.name, item.link, removeCard)))