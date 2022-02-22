import PopupWithImage from "../components/PopupWithImage.js";

class Card {
  constructor({ data, userId, handleCardClick, handleLikesClick, handleTrashClick }, cardSelector) {
    this._text = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
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

  _setEventListeners() { 
    this._trashButton = this._element.querySelector(".element__trash-button");

    this._element.querySelector(".element__like-button").addEventListener("click", (evt) => { 
      this._handleLikesClick(); 
    }); 

    this._element.querySelector(".element__trash-button").addEventListener("click", (evt) => { 
      this._handleTrashClick(); 
    }); 

    this._element.querySelector(".element__image").addEventListener("click", (evt) => 
      this._handleCardClick ({ 
        link: this._link, 
        text: this._text, 
        }) 
    ); 

    this.updateLikes();
  } 

  _handleLikes() {
    this._element.querySelector(".element__like-button").classList.toggle("element__like-button_full");
  }
  
  _handleTrash() {
    this._element.remove();

    this.element = null;
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".element__image");
    cardImage.src = this._link;
    cardImage.alt = this._text; 
    this._element.querySelector(".element__title").textContent = this._text;

    return this._element;
  }

  hideTrashButton() {
    if (this._ownerId != this._userId) {
      this._trashButton.remove();
    }
  }

  isLiked() {
    if (this._likeButton.classList.contains(".element__like-button_full")) {
      return true;
    } else {
      return false;
    }
  }
  
  checkIfLiked() {
    return Boolean(this._likes.find((item) => item._id === this._userId));
  }
  
  setLikesInfo(data) {
    this._likes = data.likes;
    this.updateLikes();
  }
  

  updateLikes(data) {
    this._element.querySelector(".element__like-count").textContent = this._likes.length;

    if (this.isLiked()) {
      this._element.querySelector(".element__like-button")
        .classList.add(".element__like-button_full");
    } else {
      this._element.querySelector(".element__like-button")
        .classList.remove(".element__like-button_full");
    }
  }
  
  getId() {
    return this._cardId;
  }

}

export default Card;
