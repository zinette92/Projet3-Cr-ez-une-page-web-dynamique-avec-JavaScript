import { modalRemovePhoto } from "./modalRemovePhoto.js";
import { clearModalAddPhoto } from "./modalAddPhoto.js";

/**
 * This function will create the main structure of the modal.
 */

function createModalStructure() {
  //Creation of the modal
  const modal = document.createElement("div");
  modal.classList.add("modal");

  //Creation of the modal content container

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  //Creation of the modal header
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");
  const backModalArrow = document.createElement("span");
  backModalArrow.classList.add("fa-solid", "fa-arrow-left", "back-modal");
  // backModalListener(backModalArrow);
  const closeModalCross = document.createElement("span");
  closeModalCross.classList.add("modal-header", "close-modal");
  closeModalCross.innerHTML = "&times;";

  //Modal title, decoration and button

  const modalTitle = document.createElement("p");
  modalTitle.classList.add("modal-title");
  const separationContentButton = document.createElement("span");
  separationContentButton.classList.add("separation-content-button");
  const addPhotoBtn = document.createElement("button");
  addPhotoBtn.classList.add("modal-btn");

  //Integration of the modal in the DOM

  modalHeader.appendChild(backModalArrow);
  modalHeader.appendChild(closeModalCross);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(separationContentButton);
  modalContent.appendChild(addPhotoBtn);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  return closeModalCross;
}

/**
 * This function will assign a listener to detect a click: inside the modal, outside the modal and on back arrow.
 * It will as well generate the modal "Remove Photo".
 */

function openModalListener() {
  document.querySelector(".update-portfolio").addEventListener("click", () => {
    closeModalListener(
      createModalStructure(),
      document.querySelector(".modal")
    );
    backModalListener(document.querySelector(".back-modal"));
    modalRemovePhoto(false);
    document.querySelector(".modal").style.display = "block";
  });
}

/**
 * This function will close the modal after a click on the cross or a click outside from the modal.
 *
 *  @param {span} closeModalBtn It represents the cross.
 *  @param {div} modal It represents the part outside from the modal.
 */

function closeModalListener(closeModalBtn, modal) {
  closeModalBtn.addEventListener("click", () => {
    document.querySelector(".modal").remove();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === document.querySelector(".modal")) {
      document.querySelector(".modal").remove();
    }
  });
}

/**
 * This function will clear the modal "Add Photo" and display the modal "Remove Photo".
 *
 *  @param {span} arrow It represents the arrow.
 */

function backModalListener(arrow) {
  arrow.addEventListener("click", () => {
    clearModalAddPhoto();
  });
}

//Add a listener to detect a click on the "modifier" link.

openModalListener();
