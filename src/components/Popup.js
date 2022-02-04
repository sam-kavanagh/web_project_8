class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }    

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_open") || evt.target.classList.contains("popup__close-button"))
        {
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

export default Popup;

