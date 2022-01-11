function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", handleEscapeKey);
  document.addEventListener("mousedown", handleMouseDown);
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscapeKey);
  document.removeEventListener("mousedown", handleMouseDown);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_open");
    closePopup(popup);
  }
}

function handleMouseDown(event) {
  if (Object.values(event.target.classList).includes("popup_open")) {
    closePopup(event.target);
  }
}

export { openPopup, closePopup };
