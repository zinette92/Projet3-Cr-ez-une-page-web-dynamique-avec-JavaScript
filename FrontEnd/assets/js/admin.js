const loginNav = document.querySelector(".login");
const updatePortoflio = document.querySelector(".update-portfolio-hide");
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

function generateModalCleanWorks() {
  const modalCleanWorks = document.createElement("div");
  modalCleanWorks.setAttribute("id", "modal-clean-Works");
  modalCleanWorks.classList.add("modal");
  modalCleanWorks.innerHTML = `<div class="modal-content">
  <span class="close-modal-clean-works">&times;</span></div>`;
  console.log("1")
  document.body.appendChild(modalCleanWorks);
  openModal(modalCleanWorks);
  closeModal(document.getElementsByClassName("close-modal-clean-works"),modalCleanWorks)
}

function openModal(modal) {

  console.log("2")

updatePortoflio.addEventListener("click", () => {
  modal.style.display = "block";
});

}


function closeModal(closeModalBtn, modal) {

  console.log("3");

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

}

generateModalCleanWorks();