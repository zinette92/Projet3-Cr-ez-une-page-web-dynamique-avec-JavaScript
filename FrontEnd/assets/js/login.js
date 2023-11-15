const loginForm = document.querySelector("#login form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const loginInformation = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value,
  };

  const chargeUtile = JSON.stringify(loginInformation);
  const wrongPwd = document.querySelector(".pwd-wrong");

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: chargeUtile,
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
      wrongPwd.innerHTML =
        "Erreur dans l'identifiant ou le mot de passe.";
    });
});


 