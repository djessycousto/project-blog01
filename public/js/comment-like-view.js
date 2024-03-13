// // Get the current URL
// const currentUrl = window.location.href;

// // Extract the path from the URL
// const pathSegments = new URL(currentUrl).pathname.split("/");

// // Find the indices of 'insight-article' and extract the two IDs
// const index = pathSegments.indexOf("insight-article");
// const postId = pathSegments[index + 1];
// const userId = pathSegments[index + 2];

// // Log the extracted IDs
// console.log("Post ID:", postId);
// console.log("User ID:", userId);
// // function comment(postId, userId) {
// //   const commentForm = document.getElementById("commentForm");
// //   const commentsContent = document.getElementById("comments");
// //   const commentBtn = document.getElementById("cbtn");
// //   console.log(commentBtn, commentsContent);

// //   //

// //   commentBtn.addEventListener("click", async (e) => {
// //     e.preventDefault();

// //     // check email
// //     if (!commentsContent.value) {
// //       message([commentsContent], "error-message", "field is required");
// //       return;
// //     }

// //     const commentsFormData = new FormData();
// //     commentsFormData.append("content", commentsContent.value);

// //     // fetch

// //     const newsletterResponse = await fetch(
// //       `
// //       /posts/insight-article/${postId}/${userId}`,
// //       {
// //         method: "POST",
// //         body: commentsFormData,
// //       }
// //     );

// //     if (!newsletterResponse.ok) {
// //       console.log("error when saving newsletter");
// //       return message(
// //         [email],
// //         "error-message",
// //         "internal server issue please try later"
// //       );
// //     }

// //     const newsletterData = await newsletterResponse.json();

// //     console.log(newsletterData);
// //   }); // end click
// // }

// function message(input, Addclass, msg) {
//   const messageDiv = document.querySelector(".message");

//   input.style.border = "1px solid red";

//   messageDiv.classList.add(Addclass);
//   messageDiv.textContent = msg;

//   setTimeout(() => {
//     inputBorders.forEach((input) => {
//       input.style.border = "";
//     });

//     messageDiv.classList.remove(Addclass);
//     messageDiv.textContent = "";
//   }, 5000);
// }
// // comment(postId, userId);
