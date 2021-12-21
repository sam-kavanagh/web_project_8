function addInputError(inputEl, settings) {
  inputEl.classList.add(settings.InputTextError);
}

function removeInputError(inputEl, settings) {
  inputEl.classList.remove(settings.InputTextError);
}

const showMessageError = (inputEl, formEl, settings) => {
  const errorDisplay = formEl.querySelector(`#${inputEl.id}-error`);
  errorDisplay.textContent = inputEl.validationMessage;
  errorDisplay.classList.add(settings.inputVisibleError);
};

const hideMessageError = (inputEl, formEl, settings) => {
  const errorDisplay = formEl.querySelector(`#${inputEl.id}-error`);
  errorDisplay.textContent = " ";
  errorDisplay.classList.remove(settings.inputVisibleError);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

function checkInputValidity(formEl, inputEl, settings) {
  if (inputEl.validity.valid) {
    hideMessageError(inputEl, formEl, settings);
    removeInputError(inputEl, formEl, settings);
  } else {
    showMessageError(inputEl, formEl, settings);
    addInputError(inputEl, formEl, settings);
  }
}

const toggleButton = (inputList, buttonEl, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
    buttonEl.classList.add(settings.inactiveButtonClass);
  } else {
    buttonEl.classList.remove(settings.inactiveButtonClass);
    buttonEl.disabled = false;
  }
};

function setEventListeners(formEl, settings) {
  const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
  const buttonEl = formEl.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", (event) => {
      checkInputValidity(formEl, inputEl, settings);
    });
  });
  buttonEl.addEventListener("click", () => {
    toggleButton(formEl, buttonEl, settings);
  });
}

function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((formEl) => {
    setEventListeners(formEl, settings);
  });
}

//settings object
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  InputTextError: "popup__input_has-error",
  inputVisibleError: "popup__text-error_visible",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
});
