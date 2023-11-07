// const { categories } = require("./models");

async function getData() {
    const response = await fetch("http://localhost:5678/api/works");
    const worksElements = await response.json();
    // waits until the request completes...
    let data = worksElements;
    displayWorks(data, 0);
  }

function displayWorks(works, filter)
{
    const gallery = document.querySelector(".gallery");
    console.log(works);
            let categories = [];

    if (works.length>0)
    {
        for (let i = 0; i < works.length; i++){
        let workContainer = document.createElement("figure");
        let imgWork = document.createElement("img");
        let imgTitle = document.createElement("figcaption");
        imgWork.src = works[i].imageUrl;
        imgWork.alt = works[i].title;
        if(categories.indexOf(works[i].category.name) === -1){
            categories.push(works[i].category.name)
        }
        imgTitle.innerHTML = works[i].title;
        workContainer.appendChild(imgWork);
        workContainer.appendChild(imgTitle);
        gallery.appendChild(workContainer);
        }
        generateFiltersBtn(categories);
        console.log(categories);

    }
    else{
        let portfolio = document.querySelector(".portfolio");
        portfolio.classList.add("hide-portolio");
    }
}

function generateFiltersBtn(filtersName)
{
    let filterBtn = document.querySelector(".filters")
    let ul = document.createElement("ul")

    //We should verify that there is more than 1 category to add the filter "All"
    
    if(filtersName.length>1)
    {
        let li = document.createElement("li")
        li.innerHTML = "Tous";
        ul.appendChild(li);
    }

    for(i=0; i<filtersName.length; i++)
    {
        let li = document.createElement("li")
        li.innerHTML = filtersName[i];
        ul.appendChild(li);
    }
    filterBtn.appendChild(ul);
}
let selectedFilterElement;

function initListener() {
    const buttons = document.querySelectorAll(".filters ul li");
    buttons.forEach((button) => button.addEventListener('click', () => {
      console.log(button);
      if (selectedFilterElement) {
        selectedFilterElement.classList.remove('selected');
      }
      selectedFilterElement = button;
      selectedFilterElement.classList.add('selected');
  
      displayWorks
      // filterSelection(button.dataset.filter);
    }));
  }
 


getData();

initListener();


