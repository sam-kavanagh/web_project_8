import {
  previewImagePopup,
  previewImageElement,
  previewImageCaption,
} from "./index.js";

class Card {
  constructor(cardSelector, data) {
    this._data = data;
    this._cardSelector = cardSelector;
  }

  createCard() {
    this._card = this._cardSelector.content
      .querySelector(".element")
      .cloneNode(true);
    this._imageElement = this._card.querySelector(".element__image");
    this._titleElement = this._card.querySelector(".element__title");

    this._imageElement.src = this._data.link;
    this._titleElement.textContent = this._data.name;
    this._imageElement.alt = this._data.name;

    this._setEeventListeners();

    return this._card;
  }

  _setEeventListeners() {
    this._previewImageElement = document.querySelector(".popup__preview-image");
    this._previewImageElement.addEventListener("click", (evt) => {
      this._handlePreviewImage();
    });

    this._likeButton = this._card.querySelector(".element__like-button");
    this._likeButton.addEventListener("click", (evt) => {
      this._handleLikeButton();
    });

    this._trashButton = this._card.querySelector(".element__trash-button");
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
