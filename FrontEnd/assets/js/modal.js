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
    "back-modal"  
    );
  backModalListener(backModalArrow);

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

function modalOption(modalId) {
  const modalContent = document.querySelector(".modal-content");
  const seperationLine = document.querySelector(".separation-content-button");
  const backModalArrow = document.querySelector(".back-modal");
  const modalTitle = document.querySelector(".modal-title");
  const addPhotoBtn = document.querySelector(".modal-btn");

  if (modalId == 1) {
    console.log("here",i);
    i++;
    backModalArrow.classList.add("back-modal-hide");
    modalTitle.innerHTML = "Galerie photos";
    addPhotoBtn.innerHTML = "Ajouter une photo";

    const deletableWorksContainer = document.createElement("div");
    deletableWorksContainer.classList.add("deletable-works-container");
    displayDeletableWorks(deletableWorksContainer);
    modalContent.insertBefore(deletableWorksContainer, seperationLine);
    console.log(modalContent)

  }
  else
  {
    document.querySelector(".deletable-works-container").remove();
    backModalArrow.classList.remove("back-modal-hide");
    modalTitle.innerHTML = "Ajout photo";
    addPhotoBtn.innerHTML = "Valider";

   const addPhotoForm = document.createElement("form");
   addPhotoForm.setAttribute("method", "post");
   addPhotoForm.classList.add("add-photo-form");
   displayFormAddPhoto(addPhotoForm);
   modalContent.insertBefore(addPhotoForm, seperationLine);

   console.log(modalContent)


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


function displayFormAddPhoto(formContainer)
{
  const addPhotoFrame = document.createElement("div");
  addPhotoFrame.classList.add("add-photo-frame");

  const addPhotoBeforeUpload = document.createElement("div");
  addPhotoBeforeUpload.classList.add("add-photo-before-upload");

  const addPhotoIcon = document.createElement("i");
  addPhotoIcon.classList.add("add-photo-icon","fa-regular", "fa-image");

  const addPhotoLabel = document.createElement("label");
  addPhotoLabel.setAttribute("for", "add-photo");
  addPhotoLabel.classList.add("add-photo-label");
  addPhotoLabel.innerHTML = "+ Ajouter photo"

  const addPhotoField = document.createElement("input");
  addPhotoField.setAttribute("type", "file");
  addPhotoField.setAttribute("id", "add-photo");
  addPhotoField.setAttribute("name", "add-photo");
  addPhotoField.setAttribute("accept", "image/png, image/jpeg");
  photoUploadedListener(addPhotoField);


  const addPhotoRules = document.createElement("p");
  addPhotoRules.classList.add("add-photo-rules");
  addPhotoRules.innerHTML = "jpg, png: 4mo max"


  const addPhotoAfterUpload = document.createElement("img");
  addPhotoAfterUpload.setAttribute("alt", "Preview de votre photo");
  addPhotoAfterUpload.classList.add("add-photo-after-upload");


  addPhotoBeforeUpload.appendChild(addPhotoIcon);
  addPhotoBeforeUpload.appendChild(addPhotoLabel);
  addPhotoBeforeUpload.appendChild(addPhotoField);
  addPhotoBeforeUpload.appendChild(addPhotoRules);
  addPhotoFrame.appendChild(addPhotoBeforeUpload);
  addPhotoFrame.appendChild(addPhotoAfterUpload);
  formContainer.appendChild(addPhotoFrame);
}

function openModal() {
  updatePortoflio.addEventListener("click", () => {
    generateModal();
    modalOption(1);
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
      modalOption(2);

    } else {
    }
  });
}

function backModalListener(target)
{
  target.addEventListener("click", () => {
    document.querySelector(".add-photo-form").remove();
    modalOption(1);
  });
}

function photoUploadedListener(target)
{
  target.addEventListener("change", () => {
    // return false;
    if (target.files.length > 0) {
      const fileSize = target.files.item(0).size;
      const fileMb = fileSize / (1024*1024);

      console.log("votre fichier a une taille de ", fileMb);
      
      if(fileMb < 4 && getImageExtension(target.files.item(0).name) === 1)
      {
        document.querySelector(".add-photo-before-upload").style.display ="none"
        document.querySelector(".add-photo-after-upload").src = URL.createObjectURL(
          target.files.item(0)
        );
        document.querySelector(".add-photo-after-upload").style.display ="block"
      }
    }  });
}

function getImageExtension(imgSrc)
{
  console.log(imgSrc);
  if(imgSrc.split('.').pop() === "png" || imgSrc.split('.').pop() === "jpg")
  {
    return 1
  }
  else 
  {
    return 0;
  }
}
openModal();