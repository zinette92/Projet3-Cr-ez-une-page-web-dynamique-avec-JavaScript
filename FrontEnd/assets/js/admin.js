const loginNav = document.querySelector(".login");
const filters = document.querySelector(".filters");
const updatePortoflio = document.querySelector(".update-portfolio-hide");
const closeModal = document.querySelector(".close-modal");
// const modal = document.querySelector(".");;

if (window.localStorage.getItem("token")) {
  loginNav.innerHTML = "logout";
  filters.classList.add("hide-filters");
  updatePortoflio.classList.remove("update-portfolio-hide");
}

loginNav.addEventListener("click", () => {
  if (window.localStorage.getItem("token")) {
    window.localStorage.clear();
    loginNav.innerHTML = '<a href ="index.html">login</a>';
    filters.classList.remove("hide-filters");
    updatePortoflio.classList.add("update-portfolio-hide");
  }
});

updatePortoflio.addEventListener("click", () => {
  document.getElementById("myModal").style.display = "block";
});

closeModal.addEventListener("click", () => {
  document.getElementById("myModal").style.display = "none";
});

loginNav.addEventListener("click", () => {
  if (window.localStorage.getItem("token")) {
    window.localStorage.clear();
    loginNav.innerHTML = '<a href ="index.html">login</a>';
    filters.classList.remove("hide-filters");
    updatePortoflio.classList.add("update-portfolio-hide");
  }
});
