function checkInputValidity(formElement, inputElement, options) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity("")
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, options)
    } else {
        hideInputError(formElement, inputElement, options)
    }
}

function showInputError(formElement, inputElement, errorMessage, options) {
    const errorElemet = formElement.querySelector(`.${inputElement.name}_error`)
    inputElement.classList.add(options.inputErrorClass)
    errorElemet.classList.add(options.errorClass)
    errorElemet.textContent = errorMessage
}

function hideInputError(formElement, inputElement, options) {
    const errorElemet = formElement.querySelector(`.${inputElement.name}_error`)
    inputElement.classList.remove(options.inputErrorClass)
    errorElemet.classList.remove(options.errorClass)
    errorElemet.textContent = ''
}

export function enableValidation(options) {
    const forms = document.querySelectorAll(options.formSelector)
    forms.forEach((form) => {
        const fields = form.querySelectorAll(options.inputSelector)
        const buttonElement = form.querySelector(options.submitButtonSelector);

        toggleButtonState(fields, buttonElement)

        fields.forEach((field) => {
            field.addEventListener('input', () => {
                checkInputValidity(form, field, options)
                toggleButtonState(fields, buttonElement)
            })
        }) 
    })
}

export function clearValidation(formElement, options) {
    const fields = formElement.querySelectorAll(options.inputSelector)
    fields.forEach((field) => {
        hideInputError(formElement, field, options)
    })
    const buttonElement = formElement.querySelector(options.submitButtonSelector);
    toggleButtonState(fields, buttonElement)
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button__inactive')
      buttonElement.disabled = true
    } else {
      buttonElement.classList.remove('popup__button__inactive')
      buttonElement.disabled = false
    }
}

const hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((inputElement) => {
        return !inputElement.validity.valid
    })
}