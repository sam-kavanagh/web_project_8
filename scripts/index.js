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
const popups = document.querySelector(".popup");
const cardList = document.querySelector(".elements");
const editProfilePopupForm = document.querySelector(".popup__form");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const addNewCardPopup = document.querySelector("#add-profile-popup");
const addProfilePopupForm = addNewCardPopup.querySelector("#new-card-form");
const previewImagePopup = document.querySelector("#popup-preview");
const previewImageElement = document.querySelector(".popup__preview-image");
const previewImageCaption = document.querySelector(".popup__caption");
const editCardName = document.querySelector("#edit-card-name");
const editCardDescription = document.querySelector("#edit-card-description");
const newCardSubmit = addNewCardPopup.querySelector("#add-submit-button");

/* -------------------------Buttons------------------------------*/
const editProfileButton = document.querySelector("#edit-Profile-Button");
const popupCloseButton = editProfilePopup.querySelector(".popup__close-button");
const addPopupButton = document.querySelector(".profile__add-button");
const addPopupCloseButton = addNewCardPopup.querySelector(
  ".popup__close-button"
);
const previewImageCloseButton = previewImagePopup.querySelector(
  ".popup__close-button"
);

/* -------------------------Form input------------------------------*/
const editFormInputName = document.querySelector("#name-input");
const editFormInputDescription = document.querySelector("#description-input");
const addFormInputName = document.querySelector("#title-input");
const addFormInputLink = document.querySelector("#link-input");

/* -------------------------Templates------------------------------*/

//Generate Card
function createCard(data) {
  const card = cardTemplate.content.querySelector(".element").cloneNode(true);
  const imageElement = card.querySelector(".element__image");
  const titleElement = card.querySelector(".element__title");

  imageElement.src = data.link;
  titleElement.textContent = data.name;
  imageElement.alt = data.name;

  const likeButton = card.querySelector(".element__like-button");
  const trashButton = card.querySelector(".element__trash-button");

  //Like-button handler
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__like-button_full");
  });

  //Trash-button handler
  trashButton.addEventListener("click", () => {
    const removeCard = trashButton.closest(".element");
    removeCard.remove();
  });

  //preview-image handler caption
  imageElement.addEventListener("click", () => {
    previewImageElement.src = data.link;
    previewImageCaption.textContent = data.name;
    previewImageElement.alt = data.name;
    openPopup(previewImagePopup);
  });

  return card;
}

function addCardToPage(card) {
  cardList.prepend(card);
}

//(function below turns data into html)
function renderCard(data) {
  addCardToPage(createCard(data));
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

//----------Popup Functions----------//

//Open Popup
function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", keyHandlerEscape);
}

//Open openPropfilePopup
function openPropfilePopup(editProfilePopup) {
  editFormInputName.value = editCardName.textContent;
  editFormInputDescription.value = editCardDescription.textContent;

  editProfilePopup.classList.add("popup_open");
}

//Close Popup
function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", keyHandlerEscape);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const keyHandlerEscape = document.querySelector(".popup_open");
    closePopup(keyHandlerEscape);
  }
});

popups.addEventListener("mousedown", (e) => {
  if (e.target === popups) {
    closePopup(popups);
  }
});

/* -------------------------EventListeners------------------------------*/

//Edit profile Open/close
editProfileButton.addEventListener("click", () => {
  openPropfilePopup(editProfilePopup);
});

popupCloseButton.addEventListener("click", () => {
  closePopup(editProfilePopup);
});

previewImageCloseButton.addEventListener("click", () => {
  closePopup(previewImagePopup);
});

//Edit Profile form submit handler
editProfilePopupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  editCardName.textContent = editFormInputName.value;
  editCardDescription.textContent = editFormInputDescription.value;
  closePopup(editProfilePopup);
});

//profile add button open/close
addPopupCloseButton.addEventListener("click", () => {
  closePopup(addNewCardPopup);
});

addPopupButton.addEventListener("click", () => {
  openPopup(addNewCardPopup);
});

//Add Profile form submit handler

addProfilePopupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCard = {
    name: addFormInputName.value,
    link: addFormInputLink.value,
  };
  renderCard(newCard);
  addProfilePopupForm.reset();
  closePopup(addNewCardPopup);
});
