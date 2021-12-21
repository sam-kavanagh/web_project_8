function addInputError(inputEl, settings) {
  inputEl.classList.add(settings.InputTextError);
}

function removeInputError(inputEl, settings) {
  inputEl.classList.remove(settings.InputTextError);
}

//Error message styles display
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

//Form validity check
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
//Button disable toggle
const toggleButton = (inputList, buttonEl, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.disabled = true;
    buttonEl.classList.add(settings.inactiveButtonClass);
  } else {
    buttonEl.classList.remove(settings.inactiveButtonClass);
    buttonEl.disabled = false;
  }
};

//Event listeners form input validaiton
function setEventListeners(formEl, settings) {
  const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
  const buttonEl = formEl.querySelector(settings.submitButtonSelector);
  if (formEl.id === "new-card-form") {
    toggleButton(inputList, buttonEl, settings);
  }
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", (event) => {
      checkInputValidity(formEl, inputEl, settings);
      toggleButton(inputList, buttonEl, settings);
    });
  });
}

//enable Validation of form
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
