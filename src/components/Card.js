import Popup from "../components/Popup";
import PopupWithImage from "../components/PopupWithImage.js";

class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._text = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
  	const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector(".element__like-button").addEventListener("click", (evt) => {
      this._handleLikeButton();
    });

    this._element.querySelector(".element__trash-button").addEventListener("click", (evt) => {
      this._handleTrashButton();
    });

    this._element.querySelector(".element__image").addEventListener("click", (evt) =>
      this._handleCardClick ({
        link: this._link,
        text: this._text,
        })
    );
  }

  _handleLikeButton() {
    this._element.querySelector(".element__like-button").classList.toggle("element__like-button_full");
  }
  
  _handleTrashButton() {
    const removedCard = this._element.closest(".element");
    removedCard.remove();
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__title").textContent = this._text;
    this._element.querySelector(".element__title").alt = this._text;

    return this._element;
  }
}

export default Card;
