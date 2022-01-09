class Card {
  constructor(template, data) {
    this._data = data;
    this._template = template;
  }

  createCard() {
    this._card = this._template.content
      .querySelector(".element")
      .cloneNode(true);
    this._imageElement = this._card.querySelector(".element__image");
    this._titleElement = this._card.querySelector(".element__title");

    this._imageElement.src = this._data.link;
    this._titleElement.textContent = this._data.name;
    this._imageElement.alt = this._data.name;

    this._likeButton = this._card.querySelector(".element__like-button");
    this._trashButton = this._card.querySelector(".element__trash-button");

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("element__like-button_full");
    });

    this._trashButton.addEventListener("click", () => {
      removeCard = this._trashButton.closest(".element");
      removeCard.remove();
    });

    this._imageElement.addEventListener("click", () => {
      previewImageElement.src = this._data.link;
      previewImageCaption.textContent = this._data.name;
      previewImageElement.alt = this._data.name;
      openPopup(previewImagePopup);
    });

    return this._card;
  }
}

export default Card;
