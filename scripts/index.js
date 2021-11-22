//declaring
const editProfileButton = document.querySelector("#edit-Profile-Button");
const editCloseButton = document.querySelector(".popup__close-button");
const popup = document.querySelector("#edit-Profile-Popup");
//Profile popup form input - defualt values
const editCardName = document.querySelector("#edit-card-name");
const editCardDescription = document.querySelector("#edit-card-description");

//Profile popup form input
const editFormInputName = document.querySelector("#edit-form-input-name");
const editFormInputDescription = document.querySelector("#edit-form-input-description");
const editPopupForm = document.querySelector(".popup__form");

//Profile edit open button //Fixed
editProfileButton.addEventListener("click", function () {
    popup.classList.add("popup_open");
    editFormInputName.value = editCardName.textContent;
    editFormInputDescription.value = editCardDescription.textContent;
});

//popup close
editCloseButton.addEventListener("click", function () {
    popup.classList.remove("popup_open");
});

// Profile popup save button automatic close
editPopupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    editCardName.textContent = editFormInputName.value;
    editCardDescription.textContent = editFormInputDescription.value;
    popup.classList.remove("popup_open");
    editPopupForm.reset();
});
