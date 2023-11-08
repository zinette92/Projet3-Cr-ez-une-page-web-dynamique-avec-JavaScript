// const { categories } = require("./models");
const gallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const filterBtn = document.querySelector(".filters");
const ul = document.querySelector(".filters ul");
const allWorks = document.querySelector(".gallery");
const categoriesName = [];
const categoriesId = [];
let selectedFiterId;
let selectedFilterElement;

/**
 * This function retrieve all available works.
 *
 * @param {number} filterId All works available according to the chosen filter.
 */

async function getData(filterId) {
    const response = await fetch("http://localhost:5678/api/works");
    const worksElements = await response.json();
    if (worksElements) { applyFilters(worksElements, filterId); }
    else { portfolio.classList.add("hide-portolio"); }
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
        const filtered = works.filter(function (id) {
            return id.categoryId === filterId;
        });
        displayWorks(filtered);
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
        if (categoriesName.indexOf(works[i].category.name) === -1) {
            categoriesName.push(works[i].category.name)
            categoriesId.push(works[i].category.id)
        }
        workContainer.appendChild(imgWork);
        workContainer.appendChild(imgCaption);
        gallery.appendChild(workContainer);
    }

    //We check whether the buttons have already been generated or not
    if (areFiltersGenerated()) { generateFiltersBtn(categoriesName, categoriesId); }
}


/**
 * This function allows to know if filters was already generated or not.
 *
 * @return {number} return if filters was already generated or not
 */

function areFiltersGenerated() {
    if (ul.childElementCount === 0) { return 1; }
    else { return 0; }
}

/**
 * This function allows to remove visible works.
 */

function removeWorks() {
    gallery.innerHTML = "";
}



/**
 * This function allows filtering by available category.
 *
 * @param {table} filtersName The table containing the category names.
 * @param {table} filtersId The table containing the category id.
 */

function generateFiltersBtn(filtersName, filtersId) {
    generateAllFilter(filtersName.length);
    for (i = 0; i < filtersName.length; i++) {
        const li = document.createElement("li")
        li.innerHTML = filtersName[i];
        li.id = filtersId[i];
        if (filtersName.length == 1) { selectedFiterId.classList.add("selected"); }
        ul.appendChild(li);
    }
    filterBtn.appendChild(ul);
}

/**
 * This function generates an "All" filter if more than 2 categories are available.
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
 * This function adds the "selected" class to the selected filter.
 *
 * @param {HTMLElement} filter The li HTMLElement.
 */

function selectedFilterUpdate(filter) {
    if (selectedFiterId) { // remove the existing highlight if any
        selectedFiterId.classList.remove('selected');
    }
    selectedFiterId = filter;
    selectedFiterId.classList.add('selected'); // highlight the new td
    filterWorksUpdate(selectedFiterId.id);
}

/**
 * This function can be used to filter works.
 *
 * @param {string} filterId The id assigned to the filter when it is generated.
 */

function filterWorksUpdate(filterId) {
    removeWorks();
    getData(parseInt(filterId));
}

ul.addEventListener("click", function (event) {
    const target = event.target; // where was the click?
    if (target.id) { selectedFilterUpdate(target); }
});


//First generation of all works

getData(0);












