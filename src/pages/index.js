import "../pages/Index.css";

//import all classes
import {initialCards, validationSettings} from "../utils/constants.js";
import Section from "../components/Section";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const cardSelector = document.querySelector("#card-template");
const cardListSelector = document.querySelector(".elements");

/*create instances of the classes */

//PopupWithImage instance
const cardPreview = new PopupWithImage("#popup-preview");

//Section instance
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

//UserInfo instance
const userInfo = new UserInfo({
  userNameSelector: "#edit-card-name",
  userDescriptionSelector: "#edit-card-description",
});

//PopupWithForm instance for edit profile popup
const userInfoPopup = new PopupWithForm({
  popupSelector: "#edit-profile-popup",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

//PopupWithForm instance new card popup
const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-popup",
  handleFormSubmit: (data) => {
    const card = new Card( 
    { 
      data:{name: data.title, link: data.link}, 
      handleCardClick: (imgData) => { 
        cardPreview.open(imgData); 
      }, 
    }, 
    "#card-template" 
  ); 
  cardSection.addItem(card.getView()); 
  }, 
}); 


///FormValidator instance
const editFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#edit-profile-form")
);

const cardFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#new-card-form")
);


/*event listeners for page*/

//edit profile open popup 
editProfileButton.addEventListener("click", (evt) => {
  const currentUserinfo = userInfo.getUserInfo()
  userInfoPopup.open(currentUserinfo);
});

//new card open popup 
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


