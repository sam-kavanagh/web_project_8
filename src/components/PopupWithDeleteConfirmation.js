import Popup from "../components/Popup.js";

class PopupWithDeleteConfirmation extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    
    this._handleDeleteForm = this._handleDeleteForm;
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
      this._handleDeleteForm(this._cardId, this._cardEl);
    })
        //   this.deleteCard();
    //   this.close();
    // });
  }

}

export default PopupWithDeleteConfirmation;