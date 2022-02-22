import Popup from "../components/Popup.js";

class PopupWithDeleteConfirmation extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    
    this._handleDeleteCard = this._handleDeleteCard;
  }
  
  //this specifies the card to be deleted
  open(deleteCard) {
    super.open();
    this.deleteCard = deleteCard;
  }
  
  setEventListeners() { 
    super.setEventListeners();

    const deleteSubmitButton = document.querySelector("#delete-submit-button");

    deleteSubmitButton.addEventListener("click", () => {
      this.deleteCard();
      this.close();
    });
  }
}

export default PopupWithDeleteConfirmation;