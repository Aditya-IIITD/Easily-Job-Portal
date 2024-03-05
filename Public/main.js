// add class on clicking register user
const registerBtn = document.querySelector("#registerbtn");
//add event
if (registerBtn) {
  registerBtn.addEventListener("click", (e) => {
    const form = document.querySelector("#formContainer");
    form.classList.remove("d-none");
  });

  //cross sign
  const cross = document.querySelector("#cross");

  cross.addEventListener("click", () => {
    const form = document.querySelector("#formContainer");
    form.classList.add("d-none");
  });
}
