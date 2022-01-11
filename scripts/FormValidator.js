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

  _toggleButton(inputList, buttonEl) {
    if (this._hasInvalidInput(inputList)) {
      buttonEl.disabled = true;
      buttonEl.classList.add(this._inactiveButtonClass);
    } else {
      buttonEl.classList.remove(this._inactiveButtonClass);
      buttonEl.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = [...this._formEl.querySelectorAll(this._inputSelector)];
    const buttonEl = this._formEl.querySelector(this._submitButtonSelector);

    inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (event) => {
        this._checkInputValidity(inputEl);
        this._toggleButton(inputList, buttonEl);
      });
    });

    document
      .querySelector("#edit-profile-button")
      .addEventListener("click", () => {
        this._toggleButton(inputList, buttonEl);
      });
    document.querySelector("#add-card-button").addEventListener("click", () => {
      this._toggleButton(inputList, buttonEl);
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
