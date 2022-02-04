import Popup from "../components/Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._imageElement = this._popupElement.querySelector(".popup__preview-image");
      this._imageCaption = this._popupElement.querySelector(".popup__caption");
      }

  open(data) {
    this._imageElement.src = data.link;
    this._imageCaption.textContent = data.text;
    this._imageElement.alt = data.text;
    super.open();
  }
}

export default PopupWithImage;