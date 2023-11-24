import { getWorks } from "./index.js";
import { getCategories } from "./index.js";

const updatePortoflio = document.querySelector(".update-portfolio");


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
  backModalListener(backModalArrow);
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

  closeModalListener(closeModalCross, modal);
}

/**
 * This function will generate the content of the modal.
 *
 * @param {number} modalId This the value to choose the modal content that you want
 * 
 * 1  - Interface to remove the works wanted
 * !1 - Form to submit a new work
 */


function modalOption(modalId) {
  const modalContent = document.querySelector(".modal-content");
  const seperationLine = document.querySelector(".separation-content-button");
  const backModalArrow = document.querySelector(".back-modal");
  const modalTitle = document.querySelector(".modal-title");
  const modalBtn = document.querySelector(".modal-btn");

  if (modalId == 1) {

    //We are updating the title and buttons texts
    backModalArrow.classList.add("back-modal-hide");
    modalTitle.innerHTML = "Galerie photos";
    modalBtn.innerHTML = "Ajouter une photo";
    modalBtn.value = "add-photo";

    //Creation and insertion in the DOM of the frame which will contains all works

    const deletableWorksContainer = document.createElement("div");
    deletableWorksContainer.classList.add("deletable-works-container");
    displayDeletableWorks(deletableWorksContainer);
    modalContent.insertBefore(deletableWorksContainer, seperationLine);
    addPhotoButtonListener(modalBtn);
  } else {

    //We are removing previous modal content and updating title and button value
    document.querySelector(".deletable-works-container").remove();
    backModalArrow.classList.remove("back-modal-hide");
    modalTitle.innerHTML = "Ajout photo";
    modalBtn.innerHTML = "Valider";
    modalBtn.value = "submit-photo";

    //Creation and insertion of the form to submit a work

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
  }
}

/**
 * This function will display all works found in the database.
 *
 * @param {div} worksContainer  The div which contains all deletable works.
 */


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

/**
 * This function will display the form to submit a work.
 *
 * @param {form} formContainer  The form which 3 fields.
 * 
 * Image - file, type/accept: png,jpg, max size: 4mb
 * Title - string
 * Category - option
 */


function displayFormAddPhoto(formContainer) {

  //Creation of the image field frame 

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
  const addPhotoRules = document.createElement("p");
  addPhotoRules.classList.add("add-photo-rules");
  addPhotoRules.innerHTML = "jpg, png: 4mo max";
  const addPhotoAfterUpload = document.createElement("img");
  addPhotoAfterUpload.setAttribute("alt", "Preview de votre photo");
  addPhotoAfterUpload.classList.add("add-photo-after-upload");

  

  //Creation of the title field

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

  //Creation of the category field

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
  fillCategoryField(selectCategoryField);
  selectCategoryContainer.appendChild(selectCategoryField);
  categorySelectedListener(selectCategoryField);

 
 //The submit button is disabled until that all fields are correctly filled

  document.querySelector(".modal-btn").disabled = "true";

  //Insertion of the form in the DOM

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

/**
 * This function will display the work added in the gallery.
 */

function addNewWorkGallery() {
  getWorks()
    .then((works) => {
      works.forEach((work) => {

        //We are displaying only the new work added.
        const isExist = document.querySelector(`[data-work-id="${work.id}"]`);

        if (!isExist) {
          const workContainer = document.createElement("figure");
          const imgWork = document.createElement("img");
          const imgCaption = document.createElement("figcaption");
          workContainer.dataset.workId = work.id;
          imgWork.src = work.imageUrl;
          imgWork.alt = work.title;
          imgCaption.innerHTML = work.title;
          workContainer.appendChild(imgWork);
          workContainer.appendChild(imgCaption);
          document.querySelector(".gallery").appendChild(workContainer);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * This function will create an option for each category available.
 *
 * @param {select} inputCategory It represents the category field
 */

function fillCategoryField(selectCategory) {

  //Creation of a blank as a default option
  const blankOption = document.createElement("option");
  blankOption.value = "category.name";
  blankOption.innerHTML = "";

  //Generation of select option

  selectCategory.appendChild(blankOption);  getCategories()
    .then((categories) => {
      categories.forEach((category) => {
        const categoryName = document.createElement("option");
        categoryName.value = category.id;
        categoryName.innerHTML = category.name;
        selectCategory.appendChild(categoryName);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * This function allows to check if the fields are correctly filled, If so, the submit button will be enabled and the user will be able to submit the work.
 */

function areFieldsFilled() {
  const image = document.getElementById("image");
  const title = document.getElementById("title");
  const category = document.getElementById("category");
  const submitBtn = document.querySelector(".modal-btn");

  //We are checking if the file field has en element, If isn't empty after removing space and If the category selected isn't the default one.

  if (image.files.length !== 0 && title.value.trim() !== "" && category.selectedIndex !== 0) {
    submitBtn.disabled = false;
  } else {
    if (!submitBtn.disabled) {
      submitBtn.disabled = true;
    }
  }
}

/**
 * This function will check the extension of the file uploaded. Only png & jpg are accepted.
 */

function getImageExtension(imgSrc) {
  if (imgSrc.split(".").pop() === "png" || imgSrc.split(".").pop() === "jpg") {
    return 1;
  } else {
    return 0;
  }
}

/**
 * This function will clear the second modal after added a work or clicking on the back arrow.
 */

function clearModal2() {
  const modalBtn = document.querySelector(".modal-btn");
  document.querySelector(".add-photo-form").remove();

  modalBtn.removeAttribute("type");
  modalBtn.removeAttribute("form");
  if (modalBtn.disabled) {
    modalBtn.disabled = false;
  }
  modalOption(1);
}

/**
 * This function is adding a listener to detect a click on the "modifier" link.
 */

function openModalListener() {
  updatePortoflio.addEventListener("click", () => {
    createModalStructure();
    modalOption(1);
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
 * This function allows to move from the first modal to the second one.
 *
 *  @param {button} arrow It represents the button displayed in the first modal.
 */

function addPhotoButtonListener(btnAddPhoto) {
  btnAddPhoto.addEventListener("click", () => {
    //We are checking if we are in the first modal or not. If so we are opening the second modal.    
    if (btnAddPhoto.value === "add-photo") {
      modalOption(2);
    }
  });
}

/**
 * This function allows to back from the second modal to the first one.
 *
 *  @param {span} arrow It represents the arrow.
 */

function backModalListener(arrow) {
  arrow.addEventListener("click", () => {
    clearModal2();
  });
}

/**
 * This function will detect a change in the input file. If there is a change the image will be uploaded if it respect these 2 conditions:
 * 
 * 1 - Size < 4mb
 * 2 - extension is png or jpg
 * 
 * If the image is accepted, we have to check if others fields are filled to enabled the submit button.
 *
 *  @param {inputImage} input It represents the image field.
 */

function photoUploadedListener(inputImage) {
  inputImage.addEventListener("change", () => {
    if (inputImage.files.length > 0) {

      //We are convertion the image size in mb

      const fileSize = inputImage.files.item(0).size;
      const fileMb = fileSize / (1024 * 1024);

      //If the file has a size < 4mb and the extension is png or jpg we can accept it.

      if (fileMb < 4 && getImageExtension(inputImage.files.item(0).name) === 1) {
        if (document.querySelector(".upload-photo-error")) {
          document.querySelector(".upload-photo-error").remove();
        }
        document.querySelector(".add-photo-before-upload").style.display =
          "none";
        document.querySelector(".add-photo-after-upload").src =
          URL.createObjectURL(inputImage.files.item(0));
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

/**
 * This function will detect a change in the title field. It will as well check if all fields are filled. If so we enabled the submit button.
 *
 *  @param {input} field It represents the title field.
 */

function titleUpdatedListener(field) {
  field.addEventListener("input", () => {
    areFieldsFilled();
  });
}

/**
 * This function will detect a change in the select category field. It will as well check if all fields are filled. If so we enabled the submit button.
 *
 *  @param {select} field It represents the category select HTML element.
 */


function categorySelectedListener(field) {
  field.addEventListener("change", () => {
    areFieldsFilled();
  });
}

/**
 * This function detect the submission of the work. 
 *
 *  @param {form} form It represents the form to submit a new work.
 */


function submitFormListener(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //Creation of a formData object to upload our 3 fields

    const formData = new FormData(form);

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
        } else {
          //If the server return an ok response, so we are back on first modal after cleaning the second modal and we are adding the work in the DOM.
          clearModal2();
          addNewWorkGallery();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}


//Add a listener to the "modifier" link.

openModalListener();
