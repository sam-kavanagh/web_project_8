import "../pages/index.css";

//import all classes
import { initialCards, validationSettings } from "../utils/constants.js";
import { renderLoading } from "../utils/utils.js";
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
const deleteCardButton = document.querySelector("#delete-submit-button");
const addCardButton = document.querySelector(".profile__add-button");

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


let cardSection;

//Section instance

Promise.all([api.getUserInfo(), api.getInitialCardList()])
.then(([userinfo, cards]) => {
  userData.setUserInfo(userinfo);
  
  const cardSection = new Section(
    {
      items: cards,
      renderer: (data) => {
        cardSection.addItem(createNewCard(data));
      },
    },
    ".elements"
  );

  cardSection.renderItems(cards);
})
.catch((err) => console.error(`Error loading initial info: ${err}`));


//PopupWithImage instance
const cardPreview = new PopupWithImage("#popup-preview");

//Card instance
const createNewCard = (data) => {
  const card = new Card(
    {
      data,
      handleCardClick: (imgData) => {
        cardPreview.open(imgData)
      },
      handleLikesClick: () => {
        if (card._isLiked()) {
          api
          .removeLike(data._id)
          .then((data) => card._updateLike(data))
          .catch((err) => console.error(`Error liking card: ${err}`))
        } else {
          api
          .addLike(data._id)
          .then((data) => card._updateLike(data))
          .catch((err) => console.error(`Error liking card: ${err}`))
        }
      },
      handleTrashClick: () => {
        deleteCardPopup.open(data._id);
      },
      userId: userData.getUserId(),
    },
    "#card-template"
  );
  return card.getView();
};

//PopupWithForm instance for edit profile popup
const profileEditPopup = new PopupWithForm({
  popupSelector: "#edit-profile-popup",
  handleFormSubmit: (data) => {
    renderLoading("#edit-profile-popup", true);
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
        renderLoading("#edit-profile-popup");
      });
  },
})

//Edit profile avatar popup window
const profileAvatarPopup = new PopupWithForm({
  popupSelector: "#profile-avatar-popup",
  handleFormSubmit: (data) => {
    renderLoading("#profile-avatar-popup", true);
    api
      .setUserAvatar(data)
      .then((avatarData) => {
        userData.setAvatar(avatarData);
        profileAvatarPopup.close();
      })
      .finally(() => {
        renderLoading("#profile-avatar-popup");
      });
  },
});

//Create new card popup
const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-popup",
  handleFormSubmit: (data) => {
    renderLoading("#add-card-popup", true);
    api
      .addCard(data)
      .then((cardData) => {
        cardSection.addItem(createNewCard(cardData));
        newCardPopup.close();
      })
      .catch((err) => {
        console.error(`Error loading new card: ${err}`)
      })
      .finally(() => {
        renderLoading("#add-card-popup");
      });
  },
});

//Delete card instance popup
const deleteCardPopup = new PopupWithForm({
  popupSelector: "#delete-card-popup",
  handleFormSubmit: (cardId, card) => {
    renderLoading("#delete-card-popup", true);
    api
      .deleteCard(cardId)
      .then(() => {
        card.remove();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(`Error loading deleting card: ${err}`)
      })
      .finally(() => {
        renderLoading("#delete-card-popup");
      });
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

const avatarFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#profile-avatar-form")
);

/*event listeners for page*/
//edit profile open popup
editProfileButton.addEventListener("click", (evt) => {
  cardFormValidator.resetValidation();
  profileEditPopup.open();
});

// editProfileButton.addEventListener("click", (evt) => {
//   const currentUserinfo = userData.getUserInfo();
//   document
//     .querySelector("#name-input")
//     .setAttribute("value", currentUserinfo["name"]);
//   document
//     .querySelector("#description-input")
//     .setAttribute("value", currentUserinfo["about"]);

//   profileEditPopup.open(currentUserinfo);
// });

//new card open popup
addCardButton.addEventListener("click", (evt) => {
  cardFormValidator.resetValidation();
  newCardPopup.open();
});

//edit profile image  popup
profileAvatarButton.addEventListener("click", (evt) => {
  avatarFormValidator.resetValidation();
  profileAvatarPopup.open();
});

//delete card popup
deleteCardButton.addEventListener("click", (evt) => {
  deleteCardPopup.open();
});

//initialize all my instances
cardPreview.setEventListeners();
profileEditPopup.setEventListeners();
profileAvatarPopup.setEventListeners();
newCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();


