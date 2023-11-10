// const { categories } = require("./models");
const gallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const filterBtn = document.querySelector(".filters");
const filtersList = document.querySelector(".filters ul");
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
 */

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
}

/**
 * This function generate all filters.
 */

function generateFilters() {
  getCategories()
    .then((categories) => {
      generateAllFilter();
      // console.log(categories);
      categories.forEach((category) => {
        // console.log(category);
        const filter = document.createElement("li");
        filter.innerHTML = category.name;
        filter.dataset.id = category.id;
        filterDetection(filter);
        filtersList.appendChild(filter);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * This function generates an "All" filter.
 */

function generateAllFilter() {
  const filter = document.createElement("li");
  filter.innerHTML = "Tous";
  filter.dataset.id = "0";
  filter.classList.add("selected");
  selectedFiter = filter;
  filterDetection(filter);
  filtersList.appendChild(filter);
}

/**
 * This function apply the filter selected.
 *
 * @param {number} filterId All works available according to the chosen filter.
 */

function displayWorks(filterId) {
  getWorks()
    .then((works) => {
      const filteredWorks = works.filter(
        (filtered) => filtered.categoryId === filterId || filterId === 0
      );
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
 * This function allows to remove visible works.
 */

function removeWorks() {
  gallery.innerHTML = "";
}

/**
 * This function add an event listener for each filter.
 * 
 *  @param {li} filter The <li> element.
 */

function filterDetection(filter){
  filter.addEventListener("click", (event) => {
    if (!event.target.classList.contains("selected")) {
      selectedFiter.classList.remove("selected");
      event.target.classList.add("selected");
      selectedFiter = event.target;
      console.log("okkk");
      removeWorks();
      displayWorks(parseInt(event.target.dataset.id));
      // console.log("ok");
    }
  });
}

//First generation of filters & works

generateFilters();
displayWorks(0);


// ul.addEventListener("click", (event) => {
//   if (event.target.dataset.id && !event.target.classList.contains("selected")) {
//     selectedFiter.classList.remove("selected");
//     event.target.classList.add("selected");
//     selectedFiter = event.target;
//     removeWorks();
//     displayWorks(parseInt(event.target.dataset.id));
//     // console.log("ok");
//   }
// });

//First generation
