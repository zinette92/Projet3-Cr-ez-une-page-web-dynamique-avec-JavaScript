import { getWorks } from "./index.js";
import { getCategories } from "./index.js";

const updatePortoflio = document.querySelector(".update-portfolio");

function generateModal() {
  const modalCleanWorks = document.createElement("div");
  modalCleanWorks.classList.add("modal");
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content", "modal-content-clean-works");
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const backModalArrow = document.createElement("span");
  backModalArrow.classList.add(
    "fa-solid",
    "fa-arrow-left",
    "back-modal",
    "back-modal-hide"
  );

  const closeModalCross = document.createElement("span");
  closeModalCross.classList.add(
    "modal-header",
    "close-modal",
    "close-modal-clean-works"
  );
  closeModalCross.innerHTML = "&times;";

  const modalTitle = document.createElement("p");
  modalTitle.classList.add("modal-title");
  // modalTitle.innerHTML = "Galerie photos";

  const separationContentButton = document.createElement("span");
  separationContentButton.classList.add("separation-content-button");

  const addPhotoBtn = document.createElement("button");
  addPhotoBtn.classList.add("modal-btn", "add-photo-btn");
  // addPhotoBtn.innerHTML = "Ajouter une photo";
  BtnListener(addPhotoBtn);

  modalHeader.appendChild(backModalArrow);
  modalHeader.appendChild(closeModalCross);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(separationContentButton);
  modalContent.appendChild(addPhotoBtn);

  modalCleanWorks.appendChild(modalContent);
  document.body.appendChild(modalCleanWorks);

  // openModal(document.querySelector(".modal"));
  closeModal(
    document.querySelector(".close-modal-clean-works"),
    modalCleanWorks
  );
}

let i = 0;

function generateModalCleanWorks(modalId) {
  const modalContent = document.querySelector(".modal-content");
  const seperationLine = document.querySelector(".separation-content-button");
  const deletableWorksContainer = document.createElement("div");
  const modalTitle = document.querySelector(".modal-title");
  const addPhotoBtn = document.querySelector(".modal-btn");

  if (modalId == 1) {
    console.log("here",i);
    i++;
    modalTitle.innerHTML = "Galerie photos";
    addPhotoBtn.innerHTML = "Ajouter une photo";
    deletableWorksContainer.classList.add("deletable-works-container");
    displayDeletableWorks(deletableWorksContainer);
    modalContent.insertBefore(deletableWorksContainer, seperationLine);
  }
  else
  {
    modalTitle.innerHTML = "Ajout photo";
    addPhotoBtn.innerHTML = "Valider";
    document.querySelector(".deletable-works-container").remove();
  }
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

function openModal() {
  updatePortoflio.addEventListener("click", () => {
    generateModal();
    generateModalCleanWorks(1);
    document.querySelector(".modal").style.display = "block";
  });
}

function closeModal(closeModalBtn, modal) {
  closeModalBtn.addEventListener("click", () => {
    document.querySelector(".modal").remove();
    // modal.style.display = "none";
  });

  modal.addEventListener("click", (event) => {
    if (event.target === document.querySelector(".modal")) {
      console.log(document.querySelector(".modal"));
      document.querySelector(".modal").remove();
      // modal.style.display = "none";
    }
  });
}

function removeAWork(target) {
  target.addEventListener("click", () => {
    const workToRemoveId = target.getAttribute("data-removed-work-id");

    console.log("here", workToRemoveId);
    fetch("http://localhost:5678/api/works/" + workToRemoveId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("Erreur lors de la suppression des données");
        } else {
          target.parentElement.remove();
          document.querySelector(`[data-work-id='${workToRemoveId}']`).remove();
        }
      })
      .catch((error) => {
        console.log("Erreur lors de la suppression des données:", error);
      });
  });
}

function BtnListener(target) {
  target.addEventListener("click", () => {
    if (target.classList.contains("add-photo-btn")) {
      generateModalCleanWorks(2);

    } else {
    }
  });
}


openModal();