// const { categories } = require("./models");
const gallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const filterBtn = document.querySelector(".filters");
const ul = document.querySelector(".filters ul");
const allWorks = document.querySelector(".gallery");
let selectedFiterId;
let selectedFilterElement;


/**
 * This function retrieve all categories available.
 */

async function getDataFilters() {
    const response = await fetch("http://localhost:5678/api/categories");
    filtersElements = await response.json();

    if (filtersElements) { generateFilters(filtersElements); }
    else { portfolio.classList.add("hide-portolio"); }
}

/**
 * This function retrieve all available works.
 *
 * @param {number} filterId All works available according to the chosen filter.
 */

async function getDataWorks(filterId) {
    const response = await fetch("http://localhost:5678/api/works");
    const worksElements = await response.json();
    if (worksElements) { applyFilters(worksElements, filterId); }
    else { portfolio.classList.add("hide-portolio"); }
}


/**
 * This function allows filtering by available category.
 *
 * @param {table} filtersName The table containing the category names.
 * @param {table} filtersId The table containing the category id.
 */

function generateFilters(nbFilters) {

    const categoriesName = [];
    const categoriesId = [];
    generateAllFilter(nbFilters.length);

    for (i = 0; i < nbFilters.length; i++) {
        const li = document.createElement("li")
        categoriesName.push(filtersElements[i].name)
        categoriesId.push(filtersElements[i].id)
        li.innerHTML = categoriesName[i];
        li.id = categoriesId[i];
        if (nbFilters.length == 1) { selectedFiterId.classList.add("selected"); }
        ul.appendChild(li);
    }
    filterBtn.appendChild(ul);
    getDataWorks(0);
}

/**
 * This function generates an "All" filter if there at least 2 filters available.
 *
 * @param {number} nbFilters The number of available filters.
 */

function generateAllFilter(nbFilters) {
    if (nbFilters > 1) {
        const li = document.createElement("li")
        li.innerHTML = "Tous";
        li.id = "0";
        selectedFiterId = li;
        selectedFiterId.classList.add("selected");
        ul.appendChild(li);
    }
}

/**
* This function apply the filter selected.
*
* @param {number} filterId All works available according to the chosen filter.
*/

function applyFilters(works, filterId) {
    if (filterId === 0) {
        displayWorks(works);
    }
    else {
        const filteredWorks = works.filter((id) => {
            return id.categoryId === filterId;
        });
        displayWorks(filteredWorks);
    }
}


/**
 * This function displays all available works.
 *
 * @param {json} works All works available according to the chosen filter.
 */

function displayWorks(works) {

    for (let i = 0; i < works.length; i++) {
        const workContainer = document.createElement("figure");
        const imgWork = document.createElement("img");
        const imgCaption = document.createElement("figcaption");
        imgWork.src = works[i].imageUrl;
        imgWork.alt = works[i].title;
        imgCaption.innerHTML = works[i].title;
        workContainer.appendChild(imgWork);
        workContainer.appendChild(imgCaption);
        gallery.appendChild(workContainer);
    }

}


/**
 * This function allows to remove visible works.
 */

function removeWorks() {
    gallery.innerHTML = "";
}


/**
 * This function adds the "selected" class to the selected filter.
 *
 * @param {HTMLElement} filter The <li> HTMLElement.
 */

function selectedFilterUpdate(filter) {
    if (selectedFiterId && selectedFiterId !== filter) {
        selectedFiterId.classList.remove('selected');
        selectedFiterId = filter;
        selectedFiterId.classList.add('selected');
        filterWorksUpdate(selectedFiterId.id);
    }

}

/**
 * This function can be used to filter works.
 *
 * @param {string} filterId The id assigned to the filter when it is generated.
 */

function filterWorksUpdate(filterId) {
    removeWorks();
    getDataWorks(parseInt(filterId));
}


//Detect click on filters 

ul.addEventListener("click", (event) => {
    if (event.target.id) { selectedFilterUpdate(event.target); }
});


//Generation of filters

getDataFilters();











