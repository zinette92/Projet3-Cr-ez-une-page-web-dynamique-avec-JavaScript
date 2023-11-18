const loginNav = document.querySelector(".login");
const updatePortoflio = document.querySelector(".update-portfolio");
const filters = document.querySelector(".filters");


if (window.localStorage.getItem("token")) {
  loginNav.innerHTML = "logout";
  filters.classList.add("hide-filters");
  updatePortoflio.classList.remove("update-portfolio-hide");
}

loginNav.addEventListener("click", () => {
  if (window.localStorage.getItem("token")) {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
    loginNav.innerHTML = '<a href ="login.html">login</a>';
    filters.classList.remove("hide-filters");
    updatePortoflio.classList.add("update-portfolio-hide");
  }
});
