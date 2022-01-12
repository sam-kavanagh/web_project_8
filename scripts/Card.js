import { openPopup } from "./utils.js";

class Card {
  constructor(cardSelector, data) {
    this._data = data;
    this._cardSelector = cardSelector;
  }

  createCard() {
    const card = this._cardSelector.content
      .querySelector(".element")
      .cloneNode(true);

    this._imageElement = card.querySelector(".element__image");
    this._titleElement = card.querySelector(".element__title");

    this._imageElement.src = this._data.link;
    this._titleElement.textContent = this._data.name;
    this._imageElement.alt = this._data.name;

    this._likeButton = card.querySelector(".element__like-button");
    this._trashButton = card.querySelector(".element__trash-button");

    this._previewImageElement = document.querySelector(".popup__preview-image");
    this._previewImagePopup = document.querySelector("#popup-preview");
    this._previewImageCaption = document.querySelector(".popup__caption");

    this._setEventListeners();

    return card;
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", (evt) => {
      this._handlePreviewImage();
    });

    this._likeButton.addEventListener("click", (evt) => {
      this._handleLikeButton();
    });

    this._trashButton.addEventListener("click", (evt) => {
      this._handleTrashButton();
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("element__like-button_full");
  }

  _handleTrashButton() {
    const removedCard = this._trashButton.closest(".element");
    removedCard.remove();
  }

  _handlePreviewImage() {
    this._previewImageElement.src = this._data.link;
    this._previewImageCaption.textContent = this._data.name;
    this._previewImageElement.alt = this._data.name;
    openPopup(this._previewImagePopup);
  }
}

export default Card;
