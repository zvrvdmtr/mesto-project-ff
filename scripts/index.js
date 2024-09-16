// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const places = document.querySelector('.places__list')

// @todo: Функция создания карточки
function addCardTemplate(location, img = '', callback = '') {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src += img
    cardElement.querySelector('.card__title').textContent = location;
    cardElement.querySelector('.card__delete-button').addEventListener('click', callback)
    places.append(cardElement)
}

// @todo: Функция удаления карточки
function removeCard(event) {
    event.target.parentElement.remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => addCardTemplate(item.name, item.link, removeCard))