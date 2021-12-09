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
const editProfilePopUpForm = document.querySelector(".popup__form");
const editProfilePopUp = document.querySelector("#edit-profile-popup");
const addNewCardPopUp = document.querySelector("#add-profile-popup");
const addProfilePopUpForm = addNewCardPopUp.querySelector("#new-card-form");
const previewImagePopUp = document.querySelector("#popup-preview");
const previewImageElement = document.querySelector(".popup__preview-image");
const previewImageCaption = document.querySelector(".popup__caption");
const editCardName = document.querySelector("#edit-card-name");
const editCardDescription = document.querySelector("#edit-card-description");
const newCardSubmit = addNewCardPopUp.querySelector("#add-submit-button");

/* -------------------------Buttons------------------------------*/
const editProfileButton = document.querySelector("#edit-Profile-Button");
const popUpCloseButton = editProfilePopUp.querySelector(".popup__close-button");
const addPopUpButton = document.querySelector(".profile__add-button");
const addPopUpCloseButton = addNewCardPopUp.querySelector(
  ".popup__close-button"
);
const previewImageCloseButton = previewImagePopUp.querySelector(
  ".popup__close-button"
);

/* -------------------------Form input------------------------------*/
const editFormInputName = document.querySelector("#edit-form-input-name");
const editFormInputDescription = document.querySelector(
  "#edit-form-input-description"
);
const addFormInputName = document.querySelector("#add-form-input-title");
const addFormInputLink = document.querySelector("#add-form-input-link");

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
    openPopUp(previewImagePopUp);
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

//----------PopUp Functions----------//

//Open PopUp
function openPopUp(popUp) {
  popUp.classList.add("popup_open");
}

//Open openPropfilePopup
function openPropfilePopup(editProfilePopUp) {
  editFormInputName.value = editCardName.textContent;
  editFormInputDescription.value = editCardDescription.textContent;

  editProfilePopUp.classList.add("popup_open");
}

//Close PopUp
function closePopUp(popUp) {
  popUp.classList.remove("popup_open");
}
/* -------------------------EventListeners------------------------------*/

//Edit profile Open/close
editProfileButton.addEventListener("click", () => {
  openPropfilePopup(editProfilePopUp);
});

popUpCloseButton.addEventListener("click", () => {
  closePopUp(editProfilePopUp);
});

previewImageCloseButton.addEventListener("click", () => {
  closePopUp(previewImagePopUp);
});

//Edit Profile form submit handler
editProfilePopUpForm.addEventListener("submit", function (event) {
  event.preventDefault();
  editCardName.textContent = editFormInputName.value;
  editCardDescription.textContent = editFormInputDescription.value;
  closePopUp(editProfilePopUp);
});

//profile add button open/close
addPopUpCloseButton.addEventListener("click", () => {
  closePopUp(addNewCardPopUp);
});

addPopUpButton.addEventListener("click", () => {
  openPopUp(addNewCardPopUp);
});

//Add Profile form submit handler

addProfilePopUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCard = {
    name: addFormInputName.value,
    link: addFormInputLink.value,
  };
  renderCard(newCard);
  addProfilePopUpForm.reset();
  closePopUp(addNewCardPopUp);
});
