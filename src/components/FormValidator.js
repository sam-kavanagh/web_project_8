class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._inputTextError = settings.inputTextError;
    this._inputVisibleError = settings.inputVisibleError;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;

    this._formEl = formEl;
  }

  _addInputError(inputEl) {
    inputEl.classList.add(this._inputTextError);
  }

  _removeInputError(inputEl) {
    inputEl.classList.remove(this._inputTextError);
  }

  _showMessageError(inputEl) {
    const errorDisplay = this._formEl.querySelector(`#${inputEl.id}-error`);
    errorDisplay.textContent = inputEl.validationMessage;
    errorDisplay.classList.add(this._inputVisibleError);
  }

  _hideMessageError(inputEl) {
    const errorDisplay = this._formEl.querySelector(`#${inputEl.id}-error`);
    errorDisplay.textContent = " ";
    errorDisplay.classList.remove(this._inputVisibleError);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _checkInputValidity(inputEl) {
    if (inputEl.validity.valid) {
      this._hideMessageError(inputEl);
      this._removeInputError(inputEl);
    } else {
      this._showMessageError(inputEl);
      this._addInputError(inputEl);
    }
  }

  _toggleButton() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonEl.disabled = true;
      this._buttonEl.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonEl.classList.remove(this._inactiveButtonClass);
      this._buttonEl.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = [...this._formEl.querySelectorAll(this._inputSelector)];

    this._buttonEl = this._formEl.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButton();
      });
    });
    this.resetValidation();
  }

  resetValidation() {
    this._inputList.forEach((inputEl) => {
      this._hideMessageError(inputEl);
      this._removeInputError(inputEl); 
  })
 // toggle button state
  this._toggleButton(); 
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
