const loginNav = document.querySelector(".login");
const updatePortoflio = document.querySelector(".update-portfolio");
const filters = document.querySelector(".filters");

//If we find a token stored in the local storage  we are making 3 actions:
// 1- Change "login" text by "logout"
// 2- Hide filters in the portfolio
// 3- Display the modal link to add or remove a work

if (window.localStorage.getItem("token")) {
  loginNav.innerHTML = "logout";
  filters.classList.add("hide-filters");
  updatePortoflio.classList.remove("update-portfolio-hide");
}

//The listener allow to detect when a user logout from the admin interface 

loginNav.addEventListener("click", () => {
  if (window.localStorage.getItem("token")) {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
    loginNav.innerHTML = '<a href ="login.html">login</a>';
    window.location.href = "index.html";
    filters.classList.remove("hide-filters");
    updatePortoflio.classList.add("update-portfolio-hide");
  }
});
