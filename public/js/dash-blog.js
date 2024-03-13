//

const tableBodyDOM = document.querySelector(".tbody");

// 1 fetch blog

const fetchData = async function () {
  try {
    const response = await fetch("/posts");
    const data = await response.json();
    const result = data.posts;

    // Assuming data is an array of posts
    const posts = await Promise.all(
      result.map(async (post) => {
        // Populate the user field to get user details
        const populatedPost = await fetch(`/users/${post.user}`);
        const userData = await populatedPost.json();
        // console.log(userData); // all users
        return {
          ...post,
          user: userData,
        };
      })
    );
    // console.log(posts);
    return posts;

    // return ;
    // return data;
  } catch (error) {
    console.log(error);
  }
};

//

// display table

function displayData(list) {
  //   console.log(list);
  if (!Array.isArray(list)) {
    console.error("Input is not an array");
    return;
  }

  const posts = list
    .map((post) => {
      const { _id: postId, user, title, post: blog, like, view } = post;
      //   const role = user.user.role;
      const { role } = user.user;
      return ` <tr>
       <td><img src="" alt="">image</td>
       <td>${role}</td>
       <td>${title}</td>
       <td class ="post-elipse" >${blog}</td>
       <td>${like}</td>
       <td>${view}</td>
       <td>
       <div class="btn-dash-contenaire-delete-edit ">
           <a class="btn edit-btn" data-id="${postId}"href="#/${postId}">Edit</a>
           <a class="btn delete-btn" data-id="${postId}" href="#">Delete</a>
           </div>
           </td>

   </tr>`;
    })
    .join("");

  tableBodyDOM.innerHTML = posts;
}

async function start() {
  const data = await fetchData();
  displayData(data);
}

start();

// ############################### edit part ###############################
const editForm = document.querySelector(".editForm");
const btnEditSubmit = document.getElementById("edi-submit");
const msg = document.querySelector(".message");

tableBodyDOM.addEventListener("click", (e) => {
  const test = e.target.classList.contains("edit-btn");

  if (test) {
    editForm.parentElement.parentElement.parentElement.classList.remove(
      "hide-edit"
    );

    const id = e.target.dataset.id;

    const fetchSingleData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/posts/${id}`);
        const singleData = await response.json();

        const { _id: postId, title, post: blog, postPicture } = singleData.post;

        console.log(blog);
        const pictureBlog = document.getElementById("postPicture");
        const postTitle = document.getElementById("posttitle");
        const post = document.getElementById("textarea-post");
        // const  = document.getElementById("")

        // console.log(title);
        // console.log(postTitle);
        // console.log(postId);

        postTitle.value = title;
        post.value = blog;
        // add id to the form by injection
        editForm.setAttribute("id", postId);
      } catch (error) {
        console.error("Error fetching single data:", error);
      }
    }; // end of fetch
    fetchSingleData();
  }
});

// ######## send the edit

btnEditSubmit.addEventListener("click", async (e) => {
  // prevent default
  e.preventDefault();

  //   formData

  const formData = new FormData(editForm);
  const formId = editForm.id;

  try {
    // Create a plain JavaScript object from the FormData
    const updateData = {};
    formData.forEach((value, key) => {
      // Exclude the File object from the updateData
      if (value instanceof File) {
        // updateData[key] = {
        //   name: value.name,
        //   size: value.size,
        //   type: value.type,
        //   lastModified: value.lastModified,
        // };

        const updateData = {
          postPictureName: "",
          postPictureSize: 0,
          postPictureType: "application/octet-stream",
          postPictureLastModified: 1706041559517,
          // other fields...
        };
      } else {
        updateData[key] = value;
      }
    });

    // send the edit
    const response = await fetch(`/posts/edit/${formId}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return console.log(`Request failed with status: ${response.status}`);
    } else {
      const data = await response.json();

      // Assuming you want to trigger a change event on an input element
      // const postTitleInput = document.getElementById("posttitle");
      // const post = document.getElementById("post");

      // console.log(postTitleInput, post);
      // if (postTitleInput && post) {
      //   // Create and dispatch a change event
      //   // const tst = postTitleInput.dispatchEvent(new Event("change"));
      //   // const tst2 = post.dispatchEvent(new Event("change"));
      //   // console.log(tst.value, tst2);
      // }

      // postTitle.value = title;
      // post.value = blog;
      // setTimeout(function () {
      //     location.reload(true);
      //   }, 10000);
    }
  } catch (error) {
    console.log(error);
  }
});

// display sdata

// const editBtn = document.querySelector(".edit-btn");
// const deleteBtn = document.querySelector(".delete-btn");

const deleteFct = () => {
  tableBodyDOM.addEventListener("click", (e) => {
    //
    const CheckIfDeleteExist = e.target.classList.contains("delete-btn");
    if (CheckIfDeleteExist) {
      // get dataset
      const postId = e.target.dataset.id;
      fetchToDelete(postId);
    }
  });
};

deleteFct();

const fetchToDelete = async (postId) => {
  const response = fetch(`/posts/${postId}`, {
    method: "DELETE",
  });

  if (!response) {
    return console.log("check your delete params");
  }

  console.log("deleted", postId);
};

// logOUT

const logoutBtn = document.querySelector(".dash-logout");

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const fetchlogout = async () => {
    const response = await fetch("/auth/logout");
    // check if sucess
    if (!response.ok) {
      console.log("there is an issue");
    }

    window.location.href = `/posts/home`;
  };
  fetchlogout();
});

///############## ADD post  ########################
const addPostBtn = document.getElementById("addpostBtn");
document.addEventListener("DOMContentLoaded", () => {
  addPostBtn.addEventListener("click", async (e) => {
    // prevent default
    e.preventDefault();

    const title = document.getElementById("title").value;
    const post = document.getElementById("post").value;
    const category = document.getElementById("category").value;
    const postPictureInput = document.getElementById("postPictureAdd");
    // console.log(postPictureInput);
    let postPicture = postPictureInput.files[0];
    // console.log(postPicture);

    if (!title || !post || !category) {
      console.log("all field must be fill");
    }

    // form data

    if (postPicture == null) {
      // remain data

      const updateDataPost = new FormData();
      updateDataPost.append("title", title);
      updateDataPost.append("post", post);
      updateDataPost.append("category", category);
      // updateDataPost.append("postPicture", addpostData.postPicture.path);

      addPostRes = await fetch("/posts", {
        method: "POST",
        body: updateDataPost,
      });

      if (!addPostRes.ok) {
        return console.log("error in the post js dash-blog data js");
      }

      addPost = await addPostRes.json();

      console.log(addPost, "all datasaved");

      setTimeout(() => {
        window.location.reload();
      }, 200);
    } else {
      const updateData = new FormData();
      updateData.append("postPicture", postPicture);

      // Append values to FormData

      // test entries
      for (const entry of updateData.entries()) {
        // console.log(entry);  //okay
      }

      const addPostResponse = await fetch("/posts/uploadPostPic", {
        method: "POST",
        body: updateData,
      });

      if (!addPostResponse.ok) {
        return console.log("error in the post js dash-blog js");
      }

      const addpostData = await addPostResponse.json();

      console.log(addpostData, "image saved");

      // remain data

      const updateDataPost = new FormData();
      updateDataPost.append("title", title);
      updateDataPost.append("post", post);
      updateDataPost.append("category", category);
      updateDataPost.append("postPicture", addpostData.postPicture.path);

      addPostRes = await fetch("/posts", {
        method: "POST",
        body: updateDataPost,
      });

      if (!addPostRes.ok) {
        return console.log("error in the post js dash-blog data js");
      }

      addPost = await addPostRes.json();

      console.log(addPost, "all datasaved");

      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  }); //dom
});
