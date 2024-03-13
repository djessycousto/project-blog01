// Get the current URL
const currentUrl = window.location.href;

// Extract the path from the URL
const pathSegments = new URL(currentUrl).pathname.split("/");

// Find the indices of 'insight-article' and extract the two IDs
const index = pathSegments.indexOf("insight-article");
const postId = pathSegments[index + 1];
const userId = pathSegments[index + 2];

// Log the extracted IDs
console.log("Post ID:", postId);
console.log("User ID:", userId);

async function view(postId, userId) {
  const baseURL = "http://localhost:3000"; // Replace with your actual server URL

  const viewResponsecheck = await fetch(
    `${baseURL}/posts/view/${postId}/${userId}`
  );
  const viewDatacheck = await viewResponsecheck.json();

  // show view

  console.log(viewDatacheck.numberOfView);

  // ////////
  const viewspan = document.querySelector(".viewnum");

  viewspan.textContent = viewDatacheck.numberOfView;

  if (!viewDatacheck) {
    const viewResponse = await fetch(
      `${baseURL}/posts/view/${postId}/${userId}`,
      {
        method: "POST",
        //   body: commentsFormData,
      }
    );

    if (!viewResponse.ok) {
      console.log("error when saving newsletter");
      return;
    }

    const viewData = await viewResponse.json();

    console.log(viewData);
  }

  return console.log("already exist ");
}

view(postId, userId);
