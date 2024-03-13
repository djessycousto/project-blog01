// // Function to fetch post content based on postId
// async function getPostContent(postId) {
//   try {
//     const response = await fetch(`/posts/api/insight-article/${postId}`);
//     if (response.ok) {
//       const content = await response.json();
//       console.log(content.post.category);
//       return content;
//     } else {
//       throw new Error("Failed to fetch post content");
//     }
//   } catch (error) {
//     console.error("Error getting post content:", error);
//     // Handle the error or return a default content object
//     return { content: "" };
//   }
// }

// // Extract postId from the URL
// const path = window.location.pathname;
// const pathSegments = path.split("/");
// const index = pathSegments.indexOf("insight-article");
// const postId = pathSegments[index + 1];

// // Fetch content of the current post

// let currentPostId = postId;
// console.log(currentPostId);
// const currentPostContent = await getPostContent(currentPostId);

// console.log(currentPostContent);
// // Function to fetch related posts based on content similarity
// async function fetchRelatedPostsByContent(currentPostContent) {
//   console.log("Content:", currentPostContent.post.category);

//   try {
//     // const response = await fetch(
//     //   `/posts/related?content=${encodeURIComponent(currentPostContent.content)}`

//     const response = await fetch(
//       `/posts/related?content=${encodeURIComponent(
//         currentPostContent.post.category
//       )}&postId=${currentPostContent.post._id}`
//     );

//     if (response.ok) {
//       const relatedPosts = await response.json();
//       console.log(relatedPosts, "related post");
//       //   displayRelatedPosts(relatedPosts);
//     }
//   } catch (error) {
//     console.error("Error fetching related posts:", error);
//   }
// }

// // Function to display related posts on the webpage
// function displayRelatedPosts(relatedPosts) {
//   const relatedPostsContainer = document.getElementById(
//     "related-posts-container"
//   );

//   // Clear previous content
//   relatedPostsContainer.innerHTML = "";

//   // Create and append HTML elements for each related post
//   relatedPosts.forEach((post) => {
//     const postElement = document.createElement("div");
//     postElement.textContent = post;
//     console.log(post);
//     relatedPostsContainer.appendChild(postElement);
//   });
// }

// // Call the function to fetch related posts for the current post
// fetchRelatedPostsByContent(currentPostContent);
