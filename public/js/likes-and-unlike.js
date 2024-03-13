export function likesAndUnlikes() {
  // Get the current URL
  const currentUrl = window.location.href;

  // Extract the path from the URL
  const pathSegments = new URL(currentUrl).pathname.split("/");

  // Find the indices of 'insight-article' and extract the two IDs
  const index = pathSegments.indexOf("insight-article");
  const postId = pathSegments[index + 1];
  // const userId = pathSegments[index + 2];

  // Log the extracted IDs
  console.log("Post ID:", postId);
  // console.log("User ID:", userId);

  async function like(postId) {
    const likespanbtn = document.querySelector(".likes");
    likespanbtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const baseURL = "http://localhost:3000"; // Replace with your actual server URL

      const likeResponsecheck = await fetch(`${baseURL}/posts/${postId}/likes`);
      const likeDatacheck = await likeResponsecheck.json();

      console.log(likeDatacheck.likesNum);
      // show view

      // console.log(likeDatacheck);
      // ////////
      const likespan = document.querySelector(".likespan");

      likespan.textContent = likeDatacheck.likesNum;

      if (!likeDatacheck.likes) {
        const likeResponse = await fetch(`${baseURL}/posts/${postId}/likes`, {
          method: "PATCH",
          //   body: commentsFormData,
        });

        if (!likeResponse.ok) {
          console.log("error when saving likes");
          return;
        }

        const likeData = await likeResponse.json();

        console.log(likeData);

        console.log(likeData, "like saved ");
      } else if (likeDatacheck.likes) {
        const viewResponse = await fetch(`${baseURL}/posts/${postId}/unlikes`, {
          method: "PATCH",
          //   body: commentsFormData,
        });
        console.log("user, unliked");
        return;
      }
    });
  }

  like(postId);
}

likesAndUnlikes();

// showlikes in dashboard

export function showLikes() {
  document.addEventListener("DomContentLoaded", () => {
    //
  });

  const fetchShowLikes = async () => {
    const showLikes = await fetch("");
  };
}
