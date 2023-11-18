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
  closeModalCross.innerHTML = "&times;";
  modalTitle.classList.add("modal-title");
  modalTitle.innerHTML = "Galerie photos";
  deletableWorksContainer.classList.add("deletable-works-container");
  displayDeletableWorks(deletableWorksContainer);

  // deletable-works-inner-container

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
{
  /* <i class="fa-solid fa-trash-can"></i> */
}

function displayDeletableWorks(worksContainer) {
  getWorks()
    .then((worksList) => {
      worksList.forEach((work) => {
        const imgDeletableWork2 = document.createElement("figure");
        const imgDeletableWork = document.createElement("img");
        const deleteIconContainer = document.createElement("span");
        const deleteIcon = document.createElement("i");
        imgDeletableWork2.classList.add("deletable-work2");
        imgDeletableWork.classList.add("deletable-work");
        imgDeletableWork.src = work.imageUrl;
        imgDeletableWork.alt = work.title;
        deleteIconContainer.classList.add("remove-work-icon-container");
        deleteIconContainer.dataset.id = work.id;
        deleteIcon.classList.add(
          "fa-solid",
          "fa-trash-can",
          "remove-work-icon"
        );
        deleteIconContainer.appendChild(deleteIcon);
        imgDeletableWork2.appendChild(imgDeletableWork);
        imgDeletableWork2.appendChild(deleteIconContainer);
        worksContainer.appendChild(imgDeletableWork2);
        removeWork(deleteIconContainer);
        console.log(localStorage.getItem("token"));
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
    if (event.target === document.querySelector(".modal")) {
      modal.style.display = "none";
      // localStorage.clear();
    }
  });
}

function removeWork(target) {
  target.addEventListener("click", (event) => {
    event.preventDefault();

    fetch("http://localhost:5678/api/works/" + target.dataset.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).catch(() => {
      console("Une erreur est survenue");
    });
  });
}

generateModalCleanWorks();
