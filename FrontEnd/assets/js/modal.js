import { getWorks } from "./index.js";
import { getCategories } from "./index.js";
import { removeModalWork } from "./index.js";


const updatePortoflio = document.querySelector(".update-portfolio");

function generateModalCleanWorks() {

  const modalCleanWorks = document.createElement("div");
  modalCleanWorks.setAttribute("id", "modal-clean-Works");
  modalCleanWorks.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeModalCross = document.createElement("span");
  closeModalCross.classList.add("close-modal", "close-modal-clean-works");
  closeModalCross.innerHTML = "&times;";

  const modalTitle = document.createElement("p");
  modalTitle.classList.add("modal-title");
  modalTitle.innerHTML = "Galerie photos";

  const deletableWorksContainer = document.createElement("div");
  deletableWorksContainer.classList.add("deletable-works-container");

  const separationContentButton = document.createElement("span");
  separationContentButton.classList.add("separation-content-button");

  const addPhotoBtn = document.createElement("button");
  addPhotoBtn.classList.add("modal-btn", "add-photo-btn");
  addPhotoBtn.innerHTML ="Ajouter une photo"
  
  
  
  displayDeletableWorks(deletableWorksContainer);

  modalContent.appendChild(closeModalCross);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(deletableWorksContainer);
  modalContent.appendChild(separationContentButton);
  modalContent.appendChild(addPhotoBtn);
  modalCleanWorks.appendChild(modalContent);
  document.body.appendChild(modalCleanWorks);


  openModal(modalCleanWorks);
  closeModal(
    document.querySelector(".close-modal-clean-works"),
    modalCleanWorks
  );
  console.log(separationContentButton);
}


function displayDeletableWorks(worksContainer) {
  getWorks()
    .then((worksList) => {
      worksList.forEach((work) => {
        const imgDeletableWork2 = document.createElement("figure");
        const imgDeletableWork = document.createElement("img");
        const deleteIconContainer = document.createElement("a");
        const deleteIcon = document.createElement("i");
        imgDeletableWork2.classList.add("deletable-work2");
        imgDeletableWork.classList.add("deletable-work");
        imgDeletableWork.src = work.imageUrl;
        imgDeletableWork.alt = work.title;
        deleteIconContainer.classList.add("remove-work-icon-container");
        deleteIconContainer.dataset.removedWorkId = work.id;
        deleteIcon.classList.add(
          "fa-solid",
          "fa-trash-can",
          "remove-work-icon"
        );
        deleteIconContainer.appendChild(deleteIcon);
        imgDeletableWork2.appendChild(imgDeletableWork);
        imgDeletableWork2.appendChild(deleteIconContainer);
        worksContainer.appendChild(imgDeletableWork2);
        removeAWork(deleteIconContainer);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}


function openModal(modal) {
  document
    .querySelector(".update-portfolio")
    .addEventListener("click", (event) => {
      modal.style.display = "block";
    });
}

function closeModal(closeModalBtn, modal) {
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (event) => {
    if (event.target === document.querySelector(".modal")) {
      modal.style.display = "none";
    }
  });
}


function removeAWork(target) {
  target.addEventListener("click", (event) => {
    console.log(target);
    const workToRemoveId = target.getAttribute("data-removed-work-id");

    if (removeModalWork(workToRemoveId)) {
      target.parentElement.remove();
      document.querySelector(`[data-work-id='${workToRemoveId}']`).remove();
    }
  });
}

generateModalCleanWorks();
