const loginForm = document.querySelector("form#login-form");
const passwordInput = document.querySelector("input#password");
const errorLabel = document.querySelector("label#message");
const submitBtn = document.querySelector("button#submitBtn");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitBtn.disabled = true;

  if (passwordInput.value == "") {
    errorLabel.textContent = "password cannot be empty.";
    setTimeout(() => {
      errorLabel.textContent = "";
      submitBtn.disabled = false;
    }, 1500);
    return;
  }

  submitBtn.childNodes[1].classList.replace("opacity-0", "opacity-100");
  submitBtn.childNodes[1].classList.toggle("hidden");

  const response = await fetch("/dashboard/login", {
    method: "Post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      password: passwordInput.value,
    }),
  });

  const result = await response.json();
  submitBtn.childNodes[1].classList.replace("opacity-100", "opacity-10");
  submitBtn.childNodes[1].classList.toggle("hidden");

  if (result.error) {
    errorLabel.textContent = result.error;
    setTimeout(() => {
      errorLabel.textContent = "";
      submitBtn.disabled = false;
    }, 1500);
    return;
  }

  const now = new Date();
  const expiresTime = now.getTime() + 1000 * 36000;
  now.setTime(expiresTime);

  document.cookie = `${btoa("token")}=${
    result.token
  }; expires=${now.toUTCString()}`;
  window.location = "/dashboard";
});
