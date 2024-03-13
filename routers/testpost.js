// const {
//   authenticateUser,
//   authorizePermissions,
// } = require("../middleware/authentication");

const express = require("express");
const router = express.Router();
const {
  createPost,
  allPosts,
  singlePost,
  editPost,
  picturePost,
  deletePost,
} = require("../controllers/post");
const { fetchAllPosts } = require("../controllers/tstController");
const {
  authenticateUser,
  authenticateUserHasLogIn,
} = require("../middleware/authentication");

router.get("/home", async (req, res) => {
  try {
    // Call the fetchAllPosts function to fetch posts
    const allpost = await fetchAllPosts();
    const posts = allpost.posts;
    res.render("index", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// insight

// router.get(
//   "/insight-article/:postId/:userId",
//   authenticateUser,
//   async (req, res) => {
//     // console.log(req.user, "from non API insight-article ");
//     try {
//       const blog = await singlePost(req, res);
//       const { post } = blog;
//       console.log(post);

//       res.render("insight", { post });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

router.get(
  "/insight-article/:postId/:userId",
  authenticateUser,
  async (req, res) => {
    try {
      const userId = req.user.userId;

      // Pass req and res to singlePost
      // await singlePost(req, res);
      const post = await singlePost(req, res);

      // Access post from res.locals
      // const { post } = res.locals;
      console.log(post);

      res.render("insight", { post });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ##### non API

// this need to be authenticateUser, authorizePermissions("admin", " user"),
router.route("/").post(createPost);
router.route("/").get(allPosts);

// like and unlike

// router.route("/:postId/like").post()
// #####################################################################################

// #####################################################################################
//(authenticateUser, authorizePermissions("admin", " user"), picturePost);

router.route("/uploadPostPic").post(picturePost);
router.route("/edit/:id").patch(editPost);

router.route("/:id").delete(deletePost);
router.route("/:id").get(singlePost);

module.exports = router;
