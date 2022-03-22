import Popup from "../components/Popup.js";

class PopupWithDeleteConfirmation extends Popup {
  constructor({popupSelector, handleDeleteForm}) {
    super(popupSelector);
    
    this._handleDeleteForm = handleDeleteForm;
    // this._popupForm = this._popupElement.querySelector(".popup__form");
  }
  
  //this specifies the card to be deleted
  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._cardEl = card;
  }
  
  setEventListeners() { 
    super.setEventListeners();

    const deleteSubmitButton = document.querySelector("#delete-submit-button");

    deleteSubmitButton.addEventListener("submit", () => { 
      evt.preventDefault();
      this._handleDeleteForm();
      this._handleDeleteForm(this._cardId, this._cardEl);
    }) 
  }

}

export default PopupWithDeleteConfirmation;