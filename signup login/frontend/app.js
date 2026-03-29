const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const gender = document.querySelector("#gender");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    firstName.value == "" ||
    lastName.value == "" ||
    gender.value == "" ||
    email.value == "" ||
    password.value == ""
  ) {
    return alert("All fields must be filled!");
  }

  const userDetails = {
    firstName: firstName.value,
    lastName: lastName.value,
    gender: gender.value,
    email: email.value,
    password: password.value,
  };

  signupUserAPI(userDetails);
});

async function signupUserAPI(user) {
  try {
    const res = await fetch(`http://localhost:5000/signup`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await res.json();
    alert(result.message);

    if (result.message == `User Signup Successfully`) {
      window.location = `./login.html`;
    }
  } catch (error) {
    alert(error.message || `Something went wrong`);
  }
}
