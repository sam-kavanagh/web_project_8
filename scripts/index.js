import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

//Six cards
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
/* -----------------------Wrappers---------------------------*/
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".elements");
const popups = document.querySelectorAll(".popup");
const handleEditProfileForm = document.querySelector(".popup__form");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const addNewCardPopup = document.querySelector("#add-profile-popup");
const addProfilePopupForm = addNewCardPopup.querySelector("#new-card-form");
const previewImagePopup = document.querySelector("#popup-preview");
const previewImageElement = document.querySelector(".popup__preview-image");
const previewImageCaption = document.querySelector(".popup__caption");
const editCardName = document.querySelector("#edit-card-name");
const editCardDescription = document.querySelector("#edit-card-description");
const newCardSubmitButton = addNewCardPopup.querySelector("#add-submit-button");
/* -------------------------Buttons------------------------------*/
const editProfileButton = document.querySelector("#edit-Profile-Button");
const addPopupButton = document.querySelector(".profile__add-button");

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
  InputTextError: "popup__input_has-error",
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

function addCardToPage(card) {
  cardList.prepend(card);
}

//(function below turns data into html)
function renderCard(data) {
  const card = new Card(cardTemplate, data);
  addCardToPage(card.createCard());
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

//----------Popup Functions----------//

//Edit Profile form submit handler
handleEditProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  editCardName.textContent = editFormInputName.value;
  editCardDescription.textContent = editFormInputDescription.value;
  closePopup(editProfilePopup);
});

/* -------------------------EventListeners------------------------------*/

//Edit profile Open/close
editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  editFormInputName.value = editCardName.innerText;
  editFormInputDescription.value = editCardDescription.innerText;
});

addPopupButton.addEventListener("click", () => {
  openPopup(addNewCardPopup);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_open")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

addProfilePopupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCard = {
    name: addFormInputName.value,
    link: addFormInputLink.value,
  };
  renderCard(newCard);
  addProfilePopupForm.reset();
  newCardSubmitButton.disabled = true;
  newCardSubmitButton.classList.add("popup__submit-button_disabled");
  closePopup(addNewCardPopup);
});
