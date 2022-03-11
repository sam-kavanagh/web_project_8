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

  Promise.all([api.getUserInfo(), api.getInitialCardList()])
  .then(([userinfo, cards]) => {
    const { name, about, avatar, _id } = userinfo;
    userData.setUserInfo({
      name: name,
      about: about,
      avatar: avatar,
      _id: _id,
    });
    const cardSection = new Section(
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

//PopupWithImage instance
const cardPreview = new PopupWithImage("#popup-preview");

//Card instance
const createNewCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: (imgData) => {
        cardPreview.open(imgData)
      },
      handleLikesClick: (data) => {
        api
          .toggleCardLikeStatus(
            card,
            !card.checkIfLiked(data),
            card.updateLikes()
          )
          .then((data) => {
            card.setLikesInfo({ ...data });
          })
      },
      handleTrashClick: (evt) => {
        deleteCardPopup.open(evt, data._id);
        api
          .deleteCard(cardId)
          .then(() => {
            card.remove();
          })
      },
    },
    "#card-template"
  );
  return card.getView();
};

//PopupWithForm instance for edit profile popup
const userInfoPopup = new PopupWithForm({
  popupSelector: "#edit-profile-popup",
  handleFormSubmit: (data) => {
    userData.setUserInfo(data);
  },
});

//Edit profile avatar popup window
const profileAvatarPopup = new PopupWithForm({
  popupSelector: "#profile-avatar-popup",
  handleFormSubmit: (data) => {
    renderLoading("#profile-avatar-popup", true);
    api
      .setUserAvatar({ avatar: data.avatar })
      .then((data) => {
        userData.setUserInfo({ avatar: data.avatar });
        profileAvatarPopup.close();
      })
      .finally(() => {
        renderLoading("#profile-avatar-popup");
      });
  },
});

//PopupWithForm instance new card popup
const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-popup",
  handleFormSubmit: (data) => {
    renderLoading("#add-card-popup", true);

    api
      .addCard(data)
      .then((cardData) => {
        cardList.addItem(createCard(cardData));
        newCardPopup.close();
      })
      .finally(() => {
        renderLoading("#add-card-popup");
      });
  },
});

//Delete card instance popup
const deleteCardPopup = new PopupWithForm({
  popupSelector: "#delete-card-popup",
  handleFormSubmit: (data) => {
    renderLoading("#delete-card-popup", true);
    api
      .deleteCard(card.getId())
      .then((data) => {
        card.handleDeleteCard(data);
        deleteCardPopup.close();
      })
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
  const currentUserinfo = userData.getUserInfo();
  document
    .querySelector("#name-input")
    .setAttribute("value", currentUserinfo["name"]);
  document
    .querySelector("#description-input")
    .setAttribute("value", currentUserinfo["about"]);

  userInfoPopup.open(currentUserinfo);
});

//new card open popup
addCardButton.addEventListener("click", (evt) => {
  newCardPopup.open();

  cardFormValidator.resetValidation();
});

//edit profile image  popup
profileAvatarButton.addEventListener("click", (evt) => {
  profileAvatarPopup.open();

  avatarFormValidator.resetValidation();
});

//delete card popup
deleteCardButton.addEventListener("click", (evt) => {
  deleteCardPopup.open();
});

//initialize all my instances
cardPreview.setEventListeners();
userInfoPopup.setEventListeners();
profileAvatarPopup.setEventListeners();
newCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
