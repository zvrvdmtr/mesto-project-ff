function checkInputValidity(formElement, inputElement, options) {
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
        fields.forEach((field) => {
            field.addEventListener('input', () => {
                checkInputValidity(form, field, options)
            })
        }) 
    })
}

export function clearValidation(formElement, options) {
    const fields = formElement.querySelectorAll(options.inputSelector)
    fields.forEach((field) => {
        hideInputError(formElement, field, options)
    })
}