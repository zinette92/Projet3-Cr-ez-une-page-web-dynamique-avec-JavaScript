// const { categories } = require("./models");
const gallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const filterBtn = document.querySelector(".filters");
const ul = document.querySelector(".filters ul");
const allWorks = document.querySelector(".gallery");
let selectedFiter;

/**
 * This function retrieve all categories available.
 */

async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  // console.log(categories);
  return categories;
}

/**
 * This function retrieve all available works.
 *
 * @param {number} filterId All works available according to the chosen filter.
 */

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
}

/**
 * This function allows filtering by available category.
 *
 * @param {table} filtersName The table containing the category names.
 * @param {table} filtersId The table containing the category id.
 */

function generateFilters() {
  getCategories()
    .then((categories) => {
      generateAllFilter();
      // console.log(categories);
      categories.forEach((category) => {
        // console.log(category);
        const li = document.createElement("li");
        li.innerHTML = category.name;
        li.dataset.id = category.id;
        ul.appendChild(li);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * This function generates an "All" filter if there at least 2 filters available.
 *
 * @param {number} nbFilters The number of available filters.
 */

function generateAllFilter() {
  const li = document.createElement("li");
  li.innerHTML = "Tous";
  li.dataset.id = "0";
  li.classList.add("selected");;
  selectedFiter = li;
  ul.appendChild(li);
}

/**
 * This function apply the filter selected.
 *
 * @param {number} filterId All works available according to the chosen filter.
 */

function applyFilters(filterId) {  
  
  getWorks()
  .then((works) => {
    const filteredWorks = works.filter(filtered => filtered.categoryId === filterId);
    filteredWorks.forEach((work) => {
    const workContainer = document.createElement("figure");
    const imgWork = document.createElement("img");
    const imgCaption = document.createElement("figcaption");
    imgWork.src = work.imageUrl;
    imgWork.alt = work.title;
    imgCaption.innerHTML = work.title;
    workContainer.appendChild(imgWork);
    workContainer.appendChild(imgCaption);
    gallery.appendChild(workContainer);
    });
  })
  .catch((error) => {
    console.log(error);
  });
}

/**
 * This function displays all available works.
 *
 * @param {json} works All works available according to the chosen filter.
 */

function displayWorks() {

  getWorks()
  .then((works) => {
    works.forEach((work) => {
    const workContainer = document.createElement("figure");
    const imgWork = document.createElement("img");
    const imgCaption = document.createElement("figcaption");
    imgWork.src = work.imageUrl;
    imgWork.alt = work.title;
    imgCaption.innerHTML = work.title;
    workContainer.appendChild(imgWork);
    workContainer.appendChild(imgCaption);
    gallery.appendChild(workContainer);
    });
  })
  .catch((error) => {
    console.log(error);
  });

}

/**
 * This function allows to remove visible works.
 */

function removeWorks() {
  gallery.innerHTML = "";
}

//Detect click on filters

ul.addEventListener("click", (event) => {
  if (event.target.dataset.id && !event.target.classList.contains("selected")) {
    selectedFiter.classList.remove("selected");
    event.target.classList.add("selected");
    selectedFiter = event.target;
    removeWorks();
    if(event.target.dataset.id === "0")
    {
      displayWorks();
    }
    else
    {
          applyFilters(parseInt(event.target.dataset.id));

    }
    // console.log("ok");
  }
});


generateFilters();
displayWorks();