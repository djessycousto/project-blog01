///////////// add user

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const btn = document.getElementById("registerBtn");

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    // part one for User detail only
    const name = document.getElementById("userName");
    const email = document.getElementById("userEmail");
    const password = document.getElementById("userPassword");
    const aboutTheUser = document.getElementById("aboutTheUser");
    console.log(aboutTheUser);
    const userImageInput = document.getElementById("userImage");
    const userImage = userImageInput.files[0];
    // console.log(userImage, "testing input ");
    const messageDiv = document.querySelector(".message");

    const inputBorders = [name, email, password, aboutTheUser];

    if (!name.value || !email.value || !password.value || !aboutTheUser.value) {
      // messageDiv.classList.add("error-message");
      // messageDiv.textContent = "All fields are required";
      message(inputBorders, "error-message", "All fields are required");

      return;
    }

    if (!name.value) {
      message([name], "error-message", "name is required");

      return;
    }
    if (!email.value) {
      message([email], "error-message", "email is required");

      return;
    }
    if (!password.value) {
      message([password], "error-message", "password is required");

      return;
    }

    if (!aboutTheUser.value) {
      message([password], "error-message", "about is required");

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      message([email], "error-message", "invalid email required");
      return;
    }

    if (password.value.length < 6) {
      message([password], "error-message", "password must be over 6 character");
      return;
    }

    // formData
    const postFormDetail = new FormData();
    postFormDetail.append("name", name.value.trim());
    postFormDetail.append("email", email.value.trim());
    postFormDetail.append("password", password.value.trim());
    postFormDetail.append("aboutTheUser", aboutTheUser.value.trim());

    // for (const entry of postFormDetail.entries()) {}
    // console.log(entry);

    // ################# fectch first userDetails to get the Id

    try {
      const userDetailResponse = await fetch("/auth/add", {
        method: "POST",

        headers: {
          // Add any necessary headers, such as 'Content-Type'
          // "Content-Type": "multipart/form-data",
        },
        body: postFormDetail,
      });

      if (userDetailResponse.ok) {
        const userDetail = await userDetailResponse.json();
        // console.log(userDetail);
        form.reset();
        const { userId } = userDetail.user;
        // console.log(userId);

        // image
        const imageFormDetail = new FormData();
        imageFormDetail.append("userImage", userImage);

        const imageResponse = await fetch(`/users/uploadUserPic/${userId}`, {
          method: "post",
          body: imageFormDetail,
        });
        if (!imageResponse.ok) {
          return console.log("image error");
        }

        const imageDatasave = await imageResponse.json();

        console.log(imageDatasave, "image insert");

        console.log(userDetail, imageDatasave, "all data");
      }
    } catch (error) {
      if (error.name === "MongoServerError" && error.code === 11000) {
        // Duplicate key error (unique constraint violation)
        console.log("User with this email already exists.");
        console.log("Error details:", error);

        // Provide an appropriate response to the user
        return res
          .status(400)
          .json({ error: "User with this email already exists." });
      } else {
        // Handle other types of errors
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }); // end click
}); // end Dom

// error function
function message(inputBorders, Addclass, msg) {
  const messageDiv = document.querySelector(".message");

  inputBorders.forEach((input) => {
    input.style.border = "1px solid red";
  });

  messageDiv.classList.add(Addclass);
  messageDiv.textContent = msg;

  setTimeout(() => {
    inputBorders.forEach((input) => {
      input.style.border = "";
    });

    messageDiv.classList.remove(Addclass);
    messageDiv.textContent = "";
  }, 5000);
}
