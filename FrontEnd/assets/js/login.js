const loginForm = document.querySelector("#login form");

//Here we add a listener to detect when the login form is submit

loginForm.addEventListener("submit", (event) => {
  
  //Prevent browser refreshing
  event.preventDefault();

  //We are creating an array which contains the login information

  const loginInformation = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value,
  };

  //We are converting the login information array into a string following the JSON notation

  const loginData = JSON.stringify(loginInformation);
  const wrongPwd = document.querySelector(".pwd-wrong");

  //Here it is the HTTP request to the server with login information

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: loginData,
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error();
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (wrongPwd.textContent !== "") {
        wrongPwd.innerHTML = "";
      }
      window.localStorage.setItem("userId", data.userId);
      window.localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    })
    .catch(() => {
      wrongPwd.innerHTML = "Erreur dans l'identifiant ou le mot de passe.";
    });
});
