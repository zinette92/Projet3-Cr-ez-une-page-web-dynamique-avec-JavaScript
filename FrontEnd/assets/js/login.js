const form = document.querySelector("#login form");


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const loginInformation = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    }

    const chargeUtile = JSON.stringify(loginInformation);
    const wrongPwd = document.querySelector(".pwd-wrong");
    const test = 18;




    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        body: chargeUtile
    }).then((response) => {
        if (response.status !== 200) { throw new Error(); }
        else { return response.json(); }
    }).then((data) => {
        if (wrongPwd.textContent !== "") { wrongPwd.innerHTML = "" }
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('token', data.token);
        window.location.href = "index.html";
    })
        .catch(() => {
            wrongPwd.innerHTML = "Cette combinaison e-mail et mot de passe est incorrecte."
        });
});
