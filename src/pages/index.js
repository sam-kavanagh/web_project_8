import "../pages/Index.css";

//import all classes
import {initialCards, validationSettings, cardSelector, cardListSelector} from "../utils/Constants.js";
import Section from "../components/Section";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
// import Popup from "../components/Popup";
// import { data } from "autoprefixer";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

//create instances of the classes
const cardPreview = new PopupWithImage("#popup-preview");

const cardSection = new Section(
{
  renderer: (data) => {
    const card = new Card(
    {
      data,
      handleCardClick: (imgData) => {
        cardPreview.open(imgData);
      },
    },
    "#card-template"
  );
  cardSection.addItem(card.getView());
},
items:initialCards
},
  ".elements"
);


const userInfo = new UserInfo({
  userNameSelector: "#edit-card-name",
  userDescriptionSelector: "#edit-card-description",
});

const userInfoPopup = new PopupWithForm({
  popupSelector: "#edit-profile-popup",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});


const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-popup",
  handleFormSubmit: (data) => {
    const card = new Card(
    {
      data,
      handleCardClick: (imgData) => {
        cardPreview.open(imgData);
      },
    },
    "#card-template"
  );
  cardSection.addItem(card.getView());
  },
});


const editFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#edit-profile-form")
);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#new-card-form")
);
cardFormValidator.enableValidation();


//event listeners for page
editProfileButton.addEventListener("click", (evt) => {
  const currentUserinfo = userInfo.getUserInfo()
  userInfoPopup.open(currentUserinfo);
});

addCardButton.addEventListener("click", (evt) => {
  newCardPopup.open();
  cardFormValidator.resetValidation();
});


//initialize all my instances
cardSection.renderItems();
cardPreview.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();


