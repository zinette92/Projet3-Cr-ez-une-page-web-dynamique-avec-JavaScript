// const { categories } = require("./models");
const gallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const filterBtn = document.querySelector(".filters");
const ul = document.querySelector(".filters ul");
const allWorks = document.querySelector(".gallery");
let selectedFiterId;
let categoriesName = [];
let categoriesId = [];


async function getData(filter) {
    const response = await fetch("http://localhost:5678/api/works");
    const worksElements = await response.json();
    // waits until the request completes...
    if(worksElements){
        if(filter !== 0){
            console.log("hello" + filter);
            const filtered = worksElements.filter(function(i) {
                return i.categoryId === filter;
              }); 
              console.log(filtered);
             displayWorks(filtered);
        }
        else {
            displayWorks(worksElements);
        }
    }
    else{
        portfolio.classList.add("hide-portolio");
    }
     
  }

function displayWorks(works)
{
     
    console.log(works);
    
    if(portfolio.classList.contains("hide-portolio")){portfolio.classList.remove("hide-portolio");}


        for (let i = 0; i < works.length; i++){
        
        let workContainer = document.createElement("figure");
        let imgWork = document.createElement("img");
        let imgCaption = document.createElement("figcaption");
        imgWork.src = works[i].imageUrl;
        imgWork.alt = works[i].title;
        if(categoriesName.indexOf(works[i].category.name) === -1){
            categoriesName.push(works[i].category.name)
            categoriesId.push(works[i].category.id)
        }
        imgCaption.innerHTML = works[i].title;
        workContainer.appendChild(imgWork);
        workContainer.appendChild(imgCaption);
        gallery.appendChild(workContainer);
        }
        if(ul.childElementCount === 0){generateFiltersBtn(categoriesName, categoriesId);}
}

function removeWorks()
{
    while(allWorks.lastElementChild)
    {
        allWorks.removeChild(allWorks.lastElementChild);
    }
}




function generateFiltersBtn(filtersName, filtersId)
{

    //We should verify that there is more than 1 category to add the filter "All"
    
    if(filtersName.length>1)
    {
        let li = document.createElement("li")
        li.innerHTML = "Tous";
        li.id ="0";
        selectedFiterId = li;
        selectedFiterId.classList.add("selected");
        selectedFiterId.classList.add("f0");
        // li.classList.add("child");
        // const li = `<li class ="child">Tous</li>`
        // ul.insertAdjacentHTML("afterBegin", li);
        // item[i].addEventListener("click", itemDone);
    

        ul.appendChild(li);
    }

    for(i=0; i<filtersName.length; i++)
    {
        let li = document.createElement("li")
        li.innerHTML = filtersName[i];
        li.classList.add("f0");
        li.id = "" + filtersId[i];
        li.classList.add("f"+ (i+1));
        // li.classList.add("child");
        // const li = `<li class ="child">Tous</li>`
        // ul.insertAdjacentHTML("afterBegin", li);
        ul.appendChild(li);
    }
    filterBtn.appendChild(ul);
}

getData(0);


let selectedFilterElement;

 ul.addEventListener("click", function(e) {
    let target = e.target; // where was the click?
    let target2 = e.target.id; // where was the click?
    console.log("eeee" + target2);
    //console.log(target.classList.contains("selected"));
    //portfolio.innerHTML = "";
    selectedFiterUpdate(target, target2);
   });


   
let i = 2;
   function selectedFiterUpdate(filter, filterId) {
    if (selectedFiterId) { // remove the existing highlight if any
        selectedFiterId.classList.remove('selected');
        if(selectedFiterId){
            removeWorks();getData(parseInt(filterId));}
        else { }
    }
    selectedFiterId = filter;
    selectedFiterId.classList.add('selected'); // highlight the new td
  }
  






