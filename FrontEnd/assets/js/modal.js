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
  backModalArrow.classList.add("fa-solid", "fa-arrow-left", "back-modal");
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
  addPhotoBtn.classList.add("modal-btn");
  // addPhotoBtn.innerHTML = "Ajouter une photo";

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

function modalOption(modalId) {
  const modalContent = document.querySelector(".modal-content");
  const seperationLine = document.querySelector(".separation-content-button");
  const backModalArrow = document.querySelector(".back-modal");
  const modalTitle = document.querySelector(".modal-title");
  const modalBtn = document.querySelector(".modal-btn");

  if (modalId == 1) {
    backModalArrow.classList.add("back-modal-hide");
    modalTitle.innerHTML = "Galerie photos";
    modalBtn.innerHTML = "Ajouter une photo";
    modalBtn.value = "add-photo";

    const deletableWorksContainer = document.createElement("div");
    deletableWorksContainer.classList.add("deletable-works-container");
    displayDeletableWorks(deletableWorksContainer);
    modalContent.insertBefore(deletableWorksContainer, seperationLine);
    modalButtonListener(modalBtn);
    // console.log(document.querySelector(".deletable-works-container"));
  } else {
    console.log(document.querySelector(".deletable-works-container"));
    document.querySelector(".deletable-works-container").remove();

    backModalArrow.classList.remove("back-modal-hide");
    modalTitle.innerHTML = "Ajout photo";
    modalBtn.innerHTML = "Valider";
    modalBtn.value = "submit-photo";

    const addPhotoForm = document.createElement("form");
    addPhotoForm.id = "work-form";
    addPhotoForm.setAttribute.method = "post";
    addPhotoForm.enctype = "multipart/form-data";
    addPhotoForm.classList.add("add-photo-form");
    displayFormAddPhoto(addPhotoForm);
    submitFormListener(addPhotoForm);
    modalContent.insertBefore(addPhotoForm, seperationLine);
    modalBtn.setAttribute("type", "submit");
    modalBtn.setAttribute("form", "work-form");
    modalButtonListener(modalBtn);
  }
}

function displayDeletableWorks(worksContainer) {
  getWorks()
    .then((worksList) => {
      worksList.forEach((work) => {
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
        deleteIcon.classList.add(
          "fa-solid",
          "fa-trash-can",
          "remove-work-icon"
        );
        deleteIconContainer.appendChild(deleteIcon);
        deletetableWorkContainer.appendChild(deletableWork);
        deletetableWorkContainer.appendChild(deleteIconContainer);
        worksContainer.appendChild(deletetableWorkContainer);
        removeAWork(deleteIconContainer);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayFormAddPhoto(formContainer) {
  const addPhotoFrame = document.createElement("div");
  addPhotoFrame.classList.add("add-photo-frame");

  const addPhotoBeforeUpload = document.createElement("div");
  addPhotoBeforeUpload.classList.add("add-photo-before-upload");

  const addPhotoIcon = document.createElement("i");
  addPhotoIcon.classList.add("add-photo-icon", "fa-regular", "fa-image");

  const addPhotoLabel = document.createElement("label");
  addPhotoLabel.setAttribute("for", "image");
  addPhotoLabel.classList.add("add-photo-label");
  addPhotoLabel.innerHTML = "+ Ajouter photo";

  const addPhotoField = document.createElement("input");
  addPhotoField.setAttribute("type", "file");
  addPhotoField.setAttribute("id", "image");
  addPhotoField.setAttribute("name", "image");
  addPhotoField.setAttribute("accept", "image/png, image/jpeg");
  photoUploadedListener(addPhotoField);

  const addTitleContainer = document.createElement("div");
  addTitleContainer.classList.add("title-container");

  const addTitleLabel = document.createElement("label");
  addTitleLabel.setAttribute("for", "title");
  addTitleLabel.classList.add("title-label");
  addTitleLabel.innerHTML = "Title";
  addTitleContainer.appendChild(addTitleLabel);

  const addTitleField = document.createElement("input");
  addTitleField.setAttribute("type", "text");
  addTitleField.setAttribute("id", "title");
  addTitleField.setAttribute("name", "title");
  addTitleContainer.appendChild(addTitleField);
  titleUpdatedListener(addTitleField);

  const selectCategoryContainer = document.createElement("div");
  selectCategoryContainer.classList.add("category-container");

  const selectCategoryLabel = document.createElement("label");
  selectCategoryLabel.setAttribute("for", "category");
  selectCategoryLabel.classList.add("category-label");
  selectCategoryLabel.innerHTML = "Catégorie";
  selectCategoryContainer.appendChild(selectCategoryLabel);

  const selectCategoryField = document.createElement("select");
  selectCategoryField.setAttribute("id", "category");
  selectCategoryField.setAttribute("name", "category");
  addCategories(selectCategoryField);
  selectCategoryContainer.appendChild(selectCategoryField);
  categorySelectedListener(selectCategoryField);

  const addPhotoRules = document.createElement("p");
  addPhotoRules.classList.add("add-photo-rules");
  addPhotoRules.innerHTML = "jpg, png: 4mo max";

  const addPhotoAfterUpload = document.createElement("img");
  addPhotoAfterUpload.setAttribute("alt", "Preview de votre photo");
  addPhotoAfterUpload.classList.add("add-photo-after-upload");

  document.querySelector(".modal-btn").disabled = "true";

  addPhotoBeforeUpload.appendChild(addPhotoIcon);
  addPhotoBeforeUpload.appendChild(addPhotoLabel);
  addPhotoBeforeUpload.appendChild(addPhotoField);
  addPhotoBeforeUpload.appendChild(addPhotoRules);
  addPhotoFrame.appendChild(addPhotoBeforeUpload);
  addPhotoFrame.appendChild(addPhotoAfterUpload);
  formContainer.appendChild(addPhotoFrame);
  formContainer.appendChild(addTitleContainer);
  formContainer.appendChild(selectCategoryContainer);
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


function addAWork()
{
  getWorks()
    .then((works) => {
      works.forEach((work) => {
      
      const isExist =  document.querySelector(`[data-work-id="${work.id}"]`);
         
      if(!isExist)
        { const workContainer = document.createElement("figure");
         const imgWork = document.createElement("img");
         const imgCaption = document.createElement("figcaption");
         workContainer.dataset.workId = work.id;
       imgWork.src = work.imageUrl;
         imgWork.alt = work.title;
         imgCaption.innerHTML = work.title;
         workContainer.appendChild(imgWork);
         workContainer.appendChild(imgCaption);
         document.querySelector(".gallery").appendChild(workContainer);}
            });
    })
    .catch((error) => {
      console.log(error);
    });
}

function modalButtonListener(target) {
  target.addEventListener("click", () => {
    if (target.value === "add-photo") {
      modalOption(2);
    }
    // else
    // {
    //   target.removeAttribute("type");
    //   target.removeAttribute("form");
    // }
  });
}

function submitFormListener(target) {
  target.addEventListener("submit", (event) => {
    event.preventDefault();
    const image = document.getElementById("image").files.item(0);
    const title = document.getElementById("title").value;
    const category = parseInt(document.getElementById("category").value);

    const formData = new FormData(target);
    // formData.append("image", image, image.name);
    // formData.append("title", title);
    // formData.append("category", category);

    // console.log(image);
    // console.log(typeof(title));
    // console.log(typeof(category));

    // const Data = new URLSearchParams(formData);
    // formData.append("image", image.files.item(0));
    // formData.append("title", title.value);
    // formData.append("category", category.selectedIndex);

    console.log(...formData);

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        else
        {
          clearModal2();
          addAWork();
        }
        // } else {
        //   return response.json();
        // }
      })
      // .then((data) => {
      //   if (wrongPwd.textContent !== "") {
      //     wrongPwd.innerHTML = "";
      //   }
      //   window.localStorage.setItem("userId", data.userId);
      //   window.localStorage.setItem("token", data.token);
      //   window.location.href = "index.html";
      // })
      .catch((error) => {
        console.log(error);
      });
  });
}

function backModalListener(target) {
  target.addEventListener("click", () => {
    clearModal2();
  });
}


function clearModal2()
{
  const modalBtn = document.querySelector(".modal-btn");
  document.querySelector(".add-photo-form").remove();

  modalBtn.removeAttribute("type");
  modalBtn.removeAttribute("form");
  if (modalBtn.disabled) {
    modalBtn.disabled = false;
  }
  modalOption(1);
}

function photoUploadedListener(target) {
  target.addEventListener("change", () => {
    // return false;
    if (target.files.length > 0) {
      const fileSize = target.files.item(0).size;
      const fileMb = fileSize / (1024 * 1024);

      if (fileMb < 4 && getImageExtension(target.files.item(0).name) === 1) {
        if (document.querySelector(".upload-photo-error")) {
          document.querySelector(".upload-photo-error").remove();
        }
        document.querySelector(".add-photo-before-upload").style.display =
          "none";
        document.querySelector(".add-photo-after-upload").src =
          URL.createObjectURL(target.files.item(0));
        document.querySelector(".add-photo-after-upload").style.display =
          "block";
        areFieldsFilled();
      } else {
        const errorMsg = document.createElement("p");
        errorMsg.classList.add("upload-photo-error");
        errorMsg.innerHTML =
          "Vérifiez l'extension ainsi que la taille de votre image";
        document
          .querySelector(".add-photo-before-upload")
          .appendChild(errorMsg);
      }
    }
  });
}

function titleUpdatedListener(field) {
  field.addEventListener("input", () => {
    areFieldsFilled();
  });
}

function categorySelectedListener(field) {
  field.addEventListener("change", () => {
    areFieldsFilled();
  });
}

function getImageExtension(imgSrc) {
  if (imgSrc.split(".").pop() === "png" || imgSrc.split(".").pop() === "jpg") {
    return 1;
  } else {
    return 0;
  }
}

function addCategories(inputCategory) {
  let createBlankOption = 1;
  getCategories()
    .then((categories) => {
      categories.forEach((category) => {
        if (createBlankOption === 1) {
          const blankOption = document.createElement("option");
          blankOption.value = "category.name";
          blankOption.innerHTML = "";
          inputCategory.appendChild(blankOption);
          createBlankOption = 0;
        }

        const categoryName = document.createElement("option");
        categoryName.value = category.id;
        categoryName.innerHTML = category.name;
        inputCategory.appendChild(categoryName);
      });
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}

function areFieldsFilled() {
  const image = document.getElementById("image");
  const title = document.getElementById("title");
  const category = document.getElementById("category");
  const submitBtn = document.querySelector(".modal-btn");

  console.log(image.files.item(0));
  console.log(title.value);
  console.log(category.value);

  if (
    image.files.length !== 0 &&
    title.value.trim() !== "" &&
    category.selectedIndex !== 0
  ) {
    submitBtn.disabled = false;
  } else {
    if (!submitBtn.disabled) {
      document.querySelector(".modal-btn").disabled = true;
    }
  }
}


openModal();
