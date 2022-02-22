export const renderLoading = (popupSelector, isLoading = false) => {
    const loadingButton = document.querySelector(popupSelector).querySelector(".popup__submit-button");
  if (isLoading) {
    loadingButton.textContent = "Saving...";
  } else {
    loadingButton.textContent = "Save";
  }
};