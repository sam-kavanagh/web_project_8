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

  updateLike(update) {
    if (update) {
      this._likes = update.likes;
    }
    this._likeCount.textContent = this._likes.length;

    if (this._likes.find((data) => data._id === this._userId)) {
      this._likeButton.classList.add('element__like-button_full');
    } else {
      this._likeButton.classList.remove('element__like-button_full');
    }
  }



  _getTemplate() {
  	const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  isLiked() {
    if (this._likeButton.classList.contains("element__like-button_full")) {
      return true;
    } else {
      return false;
    }
  }

  _setEventListeners() { 
    this._trashButton = this._element.querySelector(".element__trash-button");
    this._trashButton.addEventListener("click", () => {
      this._handleTrashClick(this);
    });

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

  _hideTrashButton() {
    if (this._userId === this._ownerId) {
      this._trashButton.style.vilibility = "visible";
    } else {
      this._trashButton.style.visibility = "hidden";
    }
  }

  getView() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".element__image");
    cardImage.src = this._link;
    cardImage.alt = this._text; 
    this._element.querySelector(".element__title").textContent = this._text;

    this._likeCount = this._element.querySelector(".element__like-count");
    this._setEventListeners();
    this.updateLike();
    this._hideTrashButton();

    return this._element;
  }

  getId() {
    return this._cardId;
  }
}

export default Card;
