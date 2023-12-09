import { getWorks } from "./index.js";
import { modalAddPhoto } from "./modalAddPhoto.js";

/**
 * This function will create the modal "Remove Photo".
 */

export function modalRemovePhoto(isHidden) {
  const modalContent = document.querySelector(".modal-content");
  const seperationLine = document.querySelector(".separation-content-button");
  const backModalArrow = document.querySelector(".back-modal");
  const modalTitle = document.querySelector(".modal-title");
  const modalBtn = document.querySelector(".modal-btn");

  //We are updating the title and buttons texts
  backModalArrow.classList.add("back-modal-hide");
  modalTitle.innerHTML = "Galerie photos";
  modalBtn.innerHTML = "Ajouter une photo";
  modalBtn.value = "add-photo";

  //Creation and insertion in the DOM of the div which will contains all works only the first time.

  if (isHidden === false) {
    const deletableWorksContainer = document.createElement("div");
    deletableWorksContainer.classList.add("deletable-works-container");
    displayDeletableWorks();
    modalContent.insertBefore(deletableWorksContainer, seperationLine);
    addPhotoButtonListener(modalBtn);
  }
}

/**
 * This will create a figure which contain the work image and a trash icon to remove this work.
 *
 * @param {work} object  This object contains all informtion of this work.
 */

export function createFrameDeletableWork(work) {
  const deletetableWorkContainer = document.createElement("figure");
  const deletableWork = document.createElement("img");
  const deleteIconContainer = document.createElement("a");
  const deleteIcon = document.createElement("i");
  deletetableWorkContainer.classList.add("deletable-work-container");
  deletableWork.classList.add("deletable-work");
  deletableWork.src = work.imageUrl;
  deletableWork.alt = work.title;
  deleteIconContainer.classList.add("remove-work-icon-container");
  deleteIconContainer.dataset.removedWorkId = work.id;
  deleteIcon.classList.add("fa-solid", "fa-trash-can", "remove-work-icon");
  deleteIconContainer.appendChild(deleteIcon);
  deletetableWorkContainer.appendChild(deletableWork);
  deletetableWorkContainer.appendChild(deleteIconContainer);
  removeAWork(deleteIconContainer);
  return deletetableWorkContainer;
}

/**
 * This function will display all works found in the database.
 *
 * @param {div} worksContainer  The div which contains all deletable works.
 */

function displayDeletableWorks() {
  getWorks()
    .then((worksList) => {
      worksList.forEach((work) => {
        document
          .querySelector(".deletable-works-container")
          .appendChild(createFrameDeletableWork(work));
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * This function allows to remove a work after clicking on the trash icon.
 *
 * @param {a} target It represents the trash icon link to the work targeted.
 */

function removeAWork(target) {
  target.addEventListener("click", () => {
    const workToRemoveId = target.getAttribute("data-removed-work-id");

    fetch("http://localhost:5678/api/works/" + workToRemoveId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Erreur lors de la suppression des données");
        } else {
          target.parentElement.remove();
          document.querySelector(`[data-work-id='${workToRemoveId}']`).remove();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

/**
 * This function allows to move from the modal "Remove Photo" to the modal "Add Photo"
 *
 *  @param {button} arrow It represents the button displayed in the first modal.
 */

function addPhotoButtonListener(btnAddPhoto) {
  btnAddPhoto.addEventListener("click", () => {
    //We are checking if we are in the first modal or not. If so we are opening the second modal.
    if (btnAddPhoto.value === "add-photo") {
      document.querySelector(".deletable-works-container").style.display = "none";
      modalAddPhoto();
    }
  });
}
