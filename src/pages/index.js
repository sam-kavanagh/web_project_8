import "../pages/index.css";
import "regenerator-runtime/runtime";
import "core-js/stable";

//import all classes
import { config, selectors } from "../utils/constants.js";
// import { renderLoading } from "../utils/utils.js";
import Api from "../components/Api.js";
import Section from "../components/Section";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDeleteConfirmation from "../components/PopupWithDeleteConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

//Buttons
const editProfileButton = document.querySelector(".profile__edit-button");
const profileAvatarButton = document.querySelector("#profile-avatar-button");
const addCardButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector("#name-input");
const descriptionInput = document.querySelector("#description-input");
/*create instances of the classes */

//Api instance
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "816a5952-0b40-4365-b524-9e18859b6d37",
    "Content-Type": "application/json",
  },
});

//UserInfo instance
const userData = new UserInfo({
  userNameSelector: "#edit-card-name",
  userDescriptionSelector: "#edit-card-description",
  userAvatarSelector: ".profile__image",
});

//PopupWithImage instance
const cardPreview = new PopupWithImage("#popup-preview");

//Card instance

const createNewCard = (data) => {
  const card = new Card(
    {
      data,
      userId: userData.getUserId(),
      handleCardClick: (imgData) => {
        cardPreview.open(imgData);
      },
      handleLikesClick: (card) => {
        if (card.isLiked()) {
          api
            .removeLike(card.getId())
            .then((data) => card.updateLike(data))
            .catch((err) => console.error(`Error removing card like: ${err}`));
        } else {
          api
            .addLike(card.getId())
            .then((data) => card.updateLike(data))
            .catch((err) => console.error(`Error liking card: ${err}`));
        }
      },
      handleTrashClick: (card) => {
        deleteCardPopup.open(card.getId(), card);
      },
    },
    "#card-template"
  );
  return card.getView();
};

//Section instance
let cardSection;

Promise.all([api.getUserInfo(), api.getInitialCardList()])
  .then(([userInfo, cards]) => {
    userData.setUserInfo(userInfo);
    cardSection = new Section(
      {
        items: cards,
        renderer: (data) => {
          cardSection.addItem(createNewCard(data));
        },
      },
      ".elements"
    );

    cardSection.renderItems();
  })
  .catch((err) => console.error(`Error loading initial info: ${err}`));

//Render loading (approach fixes text onclick change issues)
function renderLoading(loading, popupSelector, text) {
  const popup = document.querySelector(popupSelector);
  if (loading) {
    popup.querySelector(".popup__submit-button").textContent = text;
  } else {
    popup.querySelector(".popup__submit-button").textContent = text;
  }
}

//PopupWithForm instance for edit profile popup
const profileEditPopup = new PopupWithForm({
  popupSelector: "#edit-profile-popup",
  handleFormSubmit: (data) => {
    renderLoading(true, "#edit-profile-popup", "Saving...")
    api
      .patchUserInfo(data)
      .then((profileData) => {
        userData.setUserInfo(profileData);
        profileEditPopup.close();
      })
      .catch((err) => {
        console.error(`Error loading edit profile: ${err}`);
      })
      .finally(() => { 
        renderLoading(false ,"#edit-profile-popup", "Save"); 
      }); 
  },
});

//Edit profile avatar popup window
const profileAvatarPopup = new PopupWithForm({
  popupSelector: "#profile-avatar-popup",
  handleFormSubmit: (data) => {
    renderLoading(true, "#profile-avatar-popup", "Saving...");
    api
      .setUserAvatar(data)
      .then((avatarData) => {
        userData.setUserInfo(avatarData);
        profileAvatarPopup.close();
      })
      .finally(() => { 
        renderLoading(false, "#profile-avatar-popup", "Save");     
      }); 
  },
});

//Create new card popup
const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-popup",
  handleFormSubmit: (data) => {
    renderLoading(true, "#add-card-popup", "Saving..."); 
    api
      .addCard(data)
      .then((cardData) => {
        cardSection.addItem(createNewCard(cardData));
        newCardPopup.close();
      })
      .catch((err) => {
        console.error(`Error loading new card: ${err}`);
      })
      .finally(() => { 
        renderLoading(false, "#add-card-popup", "Create"); 
      });
  },
});

//Delete card instance popup
const deleteCardPopup = new PopupWithDeleteConfirmation({
  popupSelector: "#delete-card-popup",
  handleDeleteForm: (cardId, card) => {
    renderLoading(true, "#delete-card-popup", "Saving..."); 
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(`Error deleting card: ${err}`);
      })
      .finally(() => { 
        renderLoading(false,"#delete-card-popup", "Yes"); 
      });
  },
});

///FormValidator instance
const formValidators = {}

// enable validation
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formEl) => {
    const validator = new FormValidator(config, formEl);
    const formName = formEl.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);

/*event listeners for page*/

editProfileButton.addEventListener("click", () => {
  const currentUserinfo = userData.getUserInfo();
  nameInput.setAttribute("value", currentUserinfo["name"]);
  descriptionInput.setAttribute("value", currentUserinfo["about"]);

  formValidators["profile-form"].resetValidation();
  profileEditPopup.open();
});

//new card open popup
addCardButton.addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation();
  newCardPopup.open();
});

//edit profile image  popup
profileAvatarButton.addEventListener("click", () => {
  formValidators["avatar-form"].resetValidation();
  profileAvatarPopup.open();
});

//initialize all my instances
cardPreview.setEventListeners();
profileEditPopup.setEventListeners();
profileAvatarPopup.setEventListeners();
newCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
