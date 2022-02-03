import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__preview-image");
    this._imageCaption = this._popupElement.querySelector(".popup__caption");
    }

  open(data) {
    console.log(data)
    this._imageElement.src = data.link;
    this._imageCaption.textContent = data.text;
    console.log(this._imageCaption.textContent)
    this._imageElement.alt = data.text;
    super.open();
  }
}

export default PopupWithImage;

//     handleCardClick({ link, name }) {
//     this._popupElement.querySelector(".popup__caption").textContent = name;
//     const imagePopup = this._popupElement.querySelector(".element__image");
//     imagePopup.src = link;
//     imagePopup.alt = `${name}`;
//     super.open();
//   }


// _setEventListeners() {
//     this._element.querySelector(".card__text").addEventListener("click", () => {
//       this._handleMessageClick();
//     });
//   }

//   generateCard() {
//     this._element = this._getCloneFromTemplate();

//     // after getting the element, set the event listeners
//     this._setEventListeners();

//     this._element.querySelector(".card__avatar").src = this._image;
//     this._element.querySelector(".card__paragraph").textContent = this._text;

//     return this._element;
//   }
