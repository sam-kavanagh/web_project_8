import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { open, close } from "./utils.js";

/* -----------------------Wrappers---------------------------*/
// const cardSelector = document.querySelector("#card-template");
// const cardList = document.querySelector(".elements");
const popups = document.querySelectorAll(".popup");
const handleEditProfileForm = document.querySelector(".popup__form");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const addNewCardPopup = document.querySelector("#add-card-popup");
const addProfilePopupForm = addNewCardPopup.querySelector("#new-card-form");
const editCardName = document.querySelector("#edit-card-name");
const editCardDescription = document.querySelector("#edit-card-description");
const newCardSubmitButton = addNewCardPopup.querySelector("#add-submit-button");

/* -------------------------Buttons------------------------------*/
const editProfileButton = document.querySelector("#edit-profile-button");
const addCardButton = document.querySelector("#add-card-button");

/* -------------------------Form input------------------------------*/
const editFormInputName = document.querySelector("#name-input");
const editFormInputDescription = document.querySelector("#description-input");
const addFormInputName = document.querySelector("#title-input");
const addFormInputLink = document.querySelector("#link-input");

/* -------------------------Templates------------------------------*/

//settings object
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputTextError: "popup__input_has-error",
  inputVisibleError: "popup__text-error_visible",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
};

const editProfileFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#edit-profile-form")
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#new-card-form")
);
addCardFormValidator.enableValidation();

// function addCardToPage(cardElement) {
//   cardList.prepend(cardElement);
// }

// //(function below turns data into html)
// function renderCard(data) {
//   const card = new Card(data, cardSelector);
//   addCardToPage(card.getView());
// }

// initialCards.forEach((data) => {
//   renderCard(data);
// });

/* -------------------------EventListeners------------------------------*/

editProfileButton.addEventListener("click", (evt) => {
  open(editProfilePopup);
  editFormInputName.value = editCardName.innerText;
  editFormInputDescription.value = editCardDescription.innerText;
});

handleFormSubmit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editCardName.textContent = editFormInputName.value;
  editCardDescription.textContent = editFormInputDescription.value;
  close(editProfilePopup);
});

addCardButton.addEventListener("click", (evt) => {
  open(addNewCardPopup);
});

addProfilePopupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = {
    name: addFormInputName.value,
    link: addFormInputLink.value,
  };

  renderCard(newCard);
  addProfilePopupForm.reset();
  newCardSubmitButton.classList.add("popup__submit-button_disabled");
  close(addNewCardPopup);
  addCardFormValidator.resetValidation();
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_open")) {
      close(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      close(popup);
    }
  });
});
