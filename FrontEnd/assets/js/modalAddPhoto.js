import { getCategories } from "./index.js";
import { modalDisplayGallery, generateWorks } from "./modalDisplayGallery.js";

/**
 * This function will create the modal "Add Photo".
 */

export function modalAddPhoto() {
  const modalContent = document.querySelector(".modal-content");
  const seperationLine = document.querySelector(".separation-content-button");
  const backModalArrow = document.querySelector(".back-modal");
  const modalTitle = document.querySelector(".modal-title");
  const modalBtn = document.querySelector(".modal-btn");

  //We are hidding the "remove photo" modal content and updating title and button value
  document.querySelector(".deletable-works-container").visibility = "hidden";
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
  generateForm(addPhotoForm);
  submitFormListener(addPhotoForm);
  modalContent.insertBefore(addPhotoForm, seperationLine);
  modalBtn.setAttribute("type", "submit");
  modalBtn.setAttribute("form", "work-form");
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

function generateForm(formContainer) {
  //Creation of the add photo form
  const addPhotoFrame = document.createElement("div");
  addPhotoFrame.classList.add("add-photo-frame");

  //Creation of the photo field
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
  displayCategoryOptions(selectCategoryField);
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
 * This function will display the work added in the gallery.
 */

function refreshGallery(work) {
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

/**
 * This function will clear the second modal after added a work or clicking on the back arrow.
 */

export function clearModalAddPhoto() {
  const modalBtn = document.querySelector(".modal-btn");
  document.querySelector(".add-photo-form").remove();

  modalBtn.removeAttribute("type");
  modalBtn.removeAttribute("form");
  if (modalBtn.disabled) {
    modalBtn.disabled = false;
  }
  document.querySelector(".deletable-works-container").style.display = null;
  modalDisplayGallery("hidden");
}

/**
 * This function will create an option for each category available.
 *
 * @param {select} inputCategory It represents the category field
 */

function displayCategoryOptions(selectCategory) {
  //Creation of a blank as a default option
  const blankOption = document.createElement("option");
  blankOption.value = "category.name";
  blankOption.innerHTML = "";

  //Generation of select option

  selectCategory.appendChild(blankOption);
  getCategories()
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
function checkFormValidity() {
  const image = document.getElementById("image");
  const title = document.getElementById("title");
  const category = document.getElementById("category");
  const submitBtn = document.querySelector(".modal-btn");

  //We are checking if the file field has en element, If isn't empty after removing space and If the category selected isn't the default one.
  if (
    image.files.length !== 0 &&
    title.value.trim() !== "" &&
    category.selectedIndex !== 0
  ) {
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

      if (
        fileMb < 4 &&
        getImageExtension(inputImage.files.item(0).name) === 1
      ) {
        if (document.querySelector(".upload-photo-error")) {
          document.querySelector(".upload-photo-error").remove();
        }
        document.querySelector(".add-photo-before-upload").style.display =
          "none";
        document.querySelector(".add-photo-after-upload").src =
          URL.createObjectURL(inputImage.files.item(0));
        document.querySelector(".add-photo-after-upload").style.display =
          "block";
        checkFormValidity();
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
    checkFormValidity();
  });
}

/**
 * This function will detect a change in the select category field. It will as well check if all fields are filled. If so we enabled the submit button.
 *
 *  @param {select} field It represents the category select HTML element.
 */

function categorySelectedListener(field) {
  field.addEventListener("change", () => {
    checkFormValidity();
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
      .then((response) => response.json())
      .then((data) => {
        if (data === undefined) {
          throw new Error("Erreur lors de la soumission du travail");
        }

        document
          .querySelector(".deletable-works-container")
          .appendChild(generateWorks(data));
        clearModalAddPhoto();
        refreshGallery(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
