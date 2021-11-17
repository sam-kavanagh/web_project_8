//declaring
const editProfileButton = document.querySelector("#edit-Profile-Button");
const editCloseButton = document.querySelector(".popup__close-button");
const popup = document.querySelector("#edit-Profile-Popup");

// Function popup close
function closePopup() {
    popup.classList.remove("popup_open");
}

//Profile edit open button
editProfileButton.addEventListener("click", function () {
    popup.classList.add("popup_open");
});

// Profile popup close button
editCloseButton.addEventListener("click", function () {
    popup.classList.remove("popup_open");
});

//Profile popup form input
const editFormInputName = document.querySelector("#edit-form-input-name");
const editFormInputDescription = document.querySelector("#edit-form-input-description");
const editPopupForm = document.querySelector(".popup__form");
console.log(editFormInputName);
console.log(editFormInputDescription);

//Profile popup form input - defualt values
const editCardName = document.querySelector("#edit-card-name");
editFormInputName.value = editCardName.textContent;
console.log(editCardName);

const editCardDescription = document.querySelector("#edit-card-description");
editFormInputDescription.value = editCardDescription.textContent;
console.log(editCardDescription);

// Profile popup save button automatic close
editPopupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    editCardName.textContent = editFormInputName.value;
    editCardDescription.textContent = editFormInputDescription.value;
    closePopup();
});