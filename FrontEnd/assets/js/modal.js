import { getWorks } from "./index.js";
import { getCategories } from "./index.js";

const updatePortoflio = document.querySelector(".update-portfolio");

function generateModalCleanWorks() {
  const modalCleanWorks = document.createElement("div");
  const modalContent = document.createElement("div");
  const closeModalCross = document.createElement("span");
  const modalTitle = document.createElement("p");
  const deletableWorksContainer = document.createElement("div");
  modalCleanWorks.setAttribute("id", "modal-clean-Works");
  modalCleanWorks.classList.add("modal");
  modalContent.classList.add("modal-content");
  closeModalCross.classList.add("close-modal", "close-modal-clean-works");
  closeModalCross.innerHTML = "&times;"
  modalTitle.classList.add("modal-title")
  modalTitle.innerHTML = "Galerie photos";
  deletableWorksContainer.classList.add("deletable-works-container");
  displayDeletableWorks(deletableWorksContainer);



  // modalContent.innerHTML = `
  //   <span class="close-modal close-modal-clean-works">&times;</span>`;
  modalContent.appendChild(closeModalCross);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(deletableWorksContainer);
  modalCleanWorks.appendChild(modalContent);
  document.body.appendChild(modalCleanWorks);
  openModal(modalCleanWorks);
  closeModal(
    document.querySelector(".close-modal-clean-works"),
    modalCleanWorks
  );
}
{/* <i class="fa-solid fa-trash-can"></i> */}

function displayDeletableWorks(worksContainer) {
  getWorks()
    .then((worksList) => {
      worksList.forEach((work) => {
        const imgDeletableWork = document.createElement("img");
        const deleteIcon = document.createElement("i");
        imgDeletableWork.classList.add("deletable-work");
        imgDeletableWork.src = work.imageUrl;
        imgDeletableWork.alt = work.title;
        deleteIcon.classList.add("fa-solid", "fa-trash-can", "remove-work-icon");
        imgDeletableWork.appendChild(deleteIcon);
        worksContainer.appendChild(imgDeletableWork);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}




function openModal(modal) {
  document.querySelector(".update-portfolio").addEventListener("click", () => {
    modal.style.display = "block";
  });
}

function closeModal(closeModalBtn, modal) {
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (event) => {
    if (event.target !== document.querySelector(".modal-content")) {
      modal.style.display = "none";
    }
  });
}

generateModalCleanWorks();
