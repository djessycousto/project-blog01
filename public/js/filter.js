async function fetchAndPopulate() {
  const fetchAllDocuments = await fetch("/posts");
  const allData = await fetchAllDocuments.json();
  const result = allData.posts;
  // const { posts } = allData;
  //   console.log(posts);

  // populate the post

  const posts = await Promise.all(
    result.map(async (post) => {
      //  populate the user field to get the user
      const populatedPost = await fetch(`/users/${post.user}`);
      const userData = await populatedPost.json();

      //   console.log(userData, "userData");

      return {
        ...post,
        user: userData,
      };
    })
  );
  //   console.log(posts, "posts");
  return posts;

  //
}

const posts = await fetchAndPopulate();
let filterPost = [...posts];

const filterDomContainer = document.querySelector(".filter");
const domContainer = document.querySelector(".main-post-contents");

// cause i got loads so i made a newPost attribut

filterPost.forEach((post) => {
  //   console.log(
  //     post.category,
  //     post.createdAt,
  //     post.user.user.name,
  //     post._id,
  //     post.user.User._id
  //   );

  const newPost = {
    categories: post.category,
    latest: post.createdAt,
    author: post.user.user.name,
    postId: post._id,
    userId: post.user.user._id,
  };

  filterPost = [newPost];

  //   console.log(filterPost, "filter post new");
});

const displayFilter = () => {
  if (filterPost < 1) {
    domContainer.innerHTML = `<h4> no content find </h4>`;
    return;
  }
  domContainer.innerHTML = filterPost.map((filterForSearch) => {
    console.log(filterForSearch, "filterForSearch");
    const { categories, latest, author, postId, userId } = filterForSearch;
    // console.log(categories);

    return ``;
  });
};

// displayFilter();
// domContainer.innerHTML = filterPost.map({createdAt, user.user.name })
// }
