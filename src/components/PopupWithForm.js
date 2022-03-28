import Popup from "../components/Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
  }

  close() { 
    this._popupForm.reset(); 

    super.close(); 
  } 
  
  _getInputValues() {
    this._formValues = {}; 
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() { 
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => { 
      evt.preventDefault(); 
      this._handleFormSubmit(this._getInputValues()); 
    }); 
    super.setEventListeners();
  } 

} 

export default PopupWithForm;