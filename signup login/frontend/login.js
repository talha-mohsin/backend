const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = { email: email.value, password: password.value };
  loginUserAPI(user);
});

async function loginUserAPI(user) {
  try {
    const res = await fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await res.json();
    alert(result.message);
  } catch (error) {
    alert(error.message)
  }
}
