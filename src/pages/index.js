import "../pages/index.css";

//import all classes
import {initialCards, validationSettings} from "../utils/constants.js";
import {renderLoading} from "../utils/utils.js";
import Api from "../components/Api.js";
import Section from "../components/Section";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDeleteConfirmation from "../components/PopupWithDeleteConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const cardSelector = document.querySelector("#card-template");
const cardListSelector = document.querySelector(".elements");
const nameInputEl = document.querySelector("#name-input");
const descriptionInputEl = document.querySelector("#description-input");
const profileAvatarButton = document.querySelector("#profile-avatar-button");
const deleteCardPopup = document.querySelector("#delete-card-popup");


/*create instances of the classes */

//Api instance
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "816a5952-0b40-4365-b524-9e18859b6d37",
    "Content-Type": "application/json",
  },
});

const initialProfile = api.getProfileInfo();
const initialCardsList = api.getInitialCardList();

Promise.all([api.getProfileInfo(), api.getInitialCardList()])
  .then(([userInfo, initialCards]) => {
    const { name, about, avatar, _id } = userInfo;
    userData.setUserInfo({
      name: name,
      about: about,
      _id: _id,
    });
    userData.setUserAvatar({
      avatar: avatar,
    });
    cardList.renderItems(initialCards.reverse());
  })
  .catch((err) => console.error(`Error loading initial info: ${err}`))


//PopupWithImage instance
const cardPreview = new PopupWithImage("#popup-preview");


//Card instance
const createNewCard = (data) => {
  const card = new Card(
    {
      data: { name: data.name || data.title, link: data.link },
      currentUserId: userInfo.getUserId(),
      handleCardClick: (imgData) => {
        cardPreview.open(imgData);
      },
      handleLikeClick: (card) => {
        api
          .toggleCardLikeStatus(card.getId(), !card.checkIfLiked())
          .then((data) => {
            card.setLikesInfo({ ...data });
          })
          .catch((err) => console.log(`Error changing like status: ${err}`));
      },
      handleTrashClick: (card) => {
        deleteCardPopup.open();
          api
          .deleteCard(card.getId())
          .then(() => {
            card._card.remove();
          })
          .catch((error) => {
            console.error(`Delete failed: ${err}`)
          })
      }
    },
    "#card-template"
  );
  return card.getView();
}

//Section instance
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardSection.addItem(createNewCard(data));
    },
  },
  ".elements"
);
 
//UserInfo instance
const userInfo = new UserInfo({
  userNameSelector: "#edit-card-name",
  userDescriptionSelector: "#edit-card-description",
  userAvatarSelector: ".profile__image",
});

//PopupWithForm instance for edit profile popup
const userInfoPopup = new PopupWithForm({
  popupSelector: "#edit-profile-popup",
  handleFormSubmit: (data) => {   
    userInfo.setUserInfo(data);
  },
});


//Edit profile avatar popup window
const profileAvatarPopup = new PopupWithForm({
    popupSelector: "#profile-avatar-popup",
      handleFormSubmit: (data, cardId) => {
        renderLoading("#profile-avatar-popup", true);
        api
        .setProfileAvatar({ avatar: data.avatar })
        .then((data) => {
          userInfo.setUserInfo({ avatar: data.avatar });
          profileAvatarPopup.closeModal();
        })
        .catch((err) => console.error(`Error changing user avatar: ${err}`))
        .finally(() => {
          renderLoading("#profile-avatar-popup");
        });
      },
});
profileAvatarPopup.setEventListeners();

//PopupWithForm instance new card popup
const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-popup",
  handleFormSubmit: (data) => {
    renderLoading("#add-card-popup", true);

    api
      .addCard(data)
      .then((data) => {
        cardList.addItem(createCard(data));
        newCardPopup.close();
      })
      .catch((err) => console.error(`Error adding new card: ${err}`)
      )
      .finally(() => {
        renderLoading("#add-card-popup");
      })
  }
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
  const currentUserinfo = userInfo.getUserInfo();
  document.querySelector("#name-input").setAttribute('value', currentUserinfo['name']);
  document.querySelector("#description-input").setAttribute('value', currentUserinfo['description']);

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


//initialize all my instances
cardSection.renderItems();
cardPreview.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

