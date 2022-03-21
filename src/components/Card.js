import { data } from "autoprefixer";
import PopupWithImage from "../components/PopupWithImage.js";

class Card {
  constructor({ data, userId, handleCardClick, handleLikesClick, handleTrashClick }, cardSelector) {
    this._text = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.ownerId;
    // this._currentId = currentId;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikesClick = handleLikesClick;
    this._handleTrashClick = handleTrashClick;

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

  _isLiked() {
    if (this._likeButton.classList.contains("element__like-button_full")) {
      return true;
    } else {
      return false;
    }
  }

  _setEventListeners() { 
    this._trashButton = this._element.querySelector(".element__trash-button");
    if (this._ownerId === this._userId) {
      this._trashButton.addEventListener("click", () => {
        this._handleTrashClick(this);
        });
    }
    else {
      this._trashButton.remove();
    }

    this._likeButton = this._element.querySelector(".element__like-button");
    this._likeButton.addEventListener("click", () => { 
      this._handleLikesClick(this); 
    }); 

    this._element.querySelector(".element__image").addEventListener("click", () => 
      this._handleCardClick ({ 
        link: this._link, 
        text: this._text, 
        }) 
    ); 
  }   
  
  removeCard() { 
    this._element.remove(); 
    this.element = null;
  }

  _updateLikeCount(data) {
    this._likes = data.likes;
    this._updateLike();
  }

  _hideTrashButton() {
    if (this._ownerId != this._userId) {
      this._trashButton.remove();
    }
  }

  getView() {
    this._element = this._getTemplate();

    const ownerId = this._ownerId === data._ownerId;
    const cardImage = this._element.querySelector(".element__image");
    cardImage.src = this._link;
    cardImage.alt = this._text; 
    this._element.querySelector(".element__title").textContent = this._text;

    this._likeCount = this._element.querySelector(".element__like-count");
    this._setEventListeners();
    this._updateLike();
    this._hideTrashButton();

    debugger;

    return this._element;
  }

  _updateLike() {
    this._likeCount.textContent = this._likes.length;
    if (this._likes.filter((user) => user._id === this._userId).length > 0) {
      this._likeButton.classList.add("element__like-button_full");
    } else {
      this._likeButton.classList.remove("element__like-button_full");
    }
  }
  //   _handleLikes() {
  //   this._likeButton.querySelector(".element__like-button").classList.toggle(".element__like-button_full");
  // }
}

export default Card;
