import { getWorks } from "./index.js";
import { getCategories } from "./index.js";

const gallery = document.querySelector(".gallery");
const filtersList = document.createElement("ul");
const portfolio = document.querySelector("#portfolio");

/**
 * This function generate the portfolio title and the anchor to open the modal.
 */

function generatePortfolioHeader() {
  const portfolioHeader = document.createElement("div");
  portfolioHeader.classList.add("portfolio-header");
  portfolioHeader.innerHTML = `<div class ="portfolio-header-container">
           <h2>Mes Projets</h2>
          <a class="update-portfolio update-portfolio-hide" data-toggle="modal" data-target="#myModal">
             <i class="fa-solid fa-pen-to-square"></i>
             <span>modifier</span>
           </a>
 </div>`;
  portfolio.prepend(portfolioHeader);
}

/**
 * This function generate all filters.
 */

function generateFilters() {
  const filtersContainer = document.createElement("div");
  filtersContainer.classList.add("filters");
  getCategories()
    .then((categories) => {
      generateAllFilter();
      categories.forEach((category) => {
        const filter = document.createElement("li");
        filter.innerHTML = category.name;
        filter.dataset.id = category.id;
        filterDetection(filter);
        filtersList.appendChild(filter);
      });
    })
    .catch((error) => {
      console.log(error);
      return;
    });
  filtersContainer.appendChild(filtersList);
  portfolio.insertBefore(filtersContainer, gallery);
}

/**
 * This function generates an "All" filter.
 */

function generateAllFilter() {
  const filter = document.createElement("li");
  filter.innerHTML = "Tous";
  filter.dataset.id = "0";
  filter.classList.add("selected");
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
        workContainer.dataset.workId = work.id;
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
 * This function allows to remove all visible works when a filter is selected.
 */

function removeWorks() {
  gallery.innerHTML = "";
}

/**
 * This function add an event listener for each filter.
 *
 *  @param {li} filter The <li> HTML element.
 */

function filterDetection(filter) {
  filter.addEventListener("click", (event) => {
    if (!event.target.classList.contains("selected")) {
      document
        .getElementsByClassName("selected")[0]
        .classList.remove("selected");
      event.target.classList.add("selected");
      removeWorks();
      displayWorks(parseInt(event.target.dataset.id));
    }
  });
}

//First generation of filters & works

generatePortfolioHeader();
generateFilters();
displayWorks(0);
