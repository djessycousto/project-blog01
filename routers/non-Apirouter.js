const Post = require("../models/Post");
const User = require("../models/User");

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
  likes,
  unlike,
  getlikes,
  getUnlikes,
  comment,
  view,
  getAllviews,
} = require("../controllers/post");

const {
  authenticateUser,
  authenticateUserHasLogIn,
} = require("../middleware/authentication");

// ##### non API #####
router.get("/home", authenticateUserHasLogIn, async (req, res) => {
  // date

  try {
    const allPosts = await Post.find().populate("user"); // Assuming a field 'user' in your Post model

    // const users = await User.find(); // i can remove this and use post.user
    // console.log(allPosts, "from nonapi");

    // / Set userLogged to req.user if authenticated, otherwise set it to null or an empty object
    const userLogged = req.user || null; // or const userLogged = req.user || {}; // the solution to use

    // Set userLogged only if the user is authenticated
    // const userLogged = req.user ? req.user : null;

    res.render("index", { allPosts, userLogged: req.user });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// api dedicate
// router.get("/insight-article/:id/:id", authenticateUser, async (req, res) => {
//   console.log(req.user, "from non API insight-article ");
//   const id = req.user.userId;
//   console.log(id);
//   try {
//     const { id: postId } = req.params;
//     const post = await Post.findById({ _id: postId }).populate("user");
//     res.render("insight", { post, id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

router.get(
  "/insight-article/:postId/:userId",
  // authenticateUser,
  // authenticateUserHasLogIn,
  async (req, res) => {
    // console.log(req.user, "from non API insight-article ");
    try {
      const userLogged = req.user;
      const { postId, userId } = req.params;
      const post = await Post.findById({ _id: postId }).populate("user");

      if (!post) {
        // Handle the case where the post is not found
        return res.status(404).json({ msg: "Post not found" });
      }

      // console.log("userLogged in route:", userLogged); // Check if userLogged is defined here

      res.render("insight", { post, userLogged });
    } catch (error) {
      // console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

// router.route("/api/insight-article/:id").get(singlePost);

router.get("/contact", (req, res) => {
  try {
    res.render("contact");
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// router.get("/related", async (req, res) => {
//   try {
//     const post = req.query;
//     // console.log("Received parameters:", req.query);
//     // console.log("content querry ", [post.content]);

//     const contentString = Array.isArray(post.content)
//       ? post.content.join(", ")
//       : post.content;
//     console.log("content querry ", [contentString]);

//     // // Find related posts based on content similarity
//     // const relatedPosts = await Post.find({
//     //   content: { $regex: new RegExp(content, "i") },
//     // });
//     const regexPattern = new RegExp(post.join("|"), "i");
//     console.log("Regex Pattern:", regexPattern);

//     const relatedPosts = await Post.find({
//       _id: { $ne: req.query.postId }, // Exclude the current post
//       content: { $regex: new RegExp(post) },
//     });

//     console.log(relatedPosts, "rel");

//     res.json({ relatedPosts });

//     // Respond with a fixed set of data for testing
//     // res.json([{ title: "Test Post" }]);
//   } catch (error) {
//     console.error("Error fetching related posts:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// this need to be authenticateUser, authorizePermissions("admin", " user"),

// like and unlike

// #####################################################################################
router.route("/uploadPostPic").post(picturePost);
router.route("/").post(authenticateUser, createPost);
router.route("/").get(allPosts);
router.route("/edit/:id").patch(authenticateUser, editPost);
router.route("/:postId/likes").get(authenticateUser, getlikes);
router.route("/:postId/unlikes").get(authenticateUser, getUnlikes);

router.route("/:postId/likes").patch(authenticateUser, likes);
router.route("/:postId/unlikes").patch(authenticateUser, unlike);

router.route("/view/:postId/:userId").post(authenticateUser, view);
router.route("/view/:postId/:userId").get(authenticateUser, getAllviews);
// comment
router
  .route("/insight-article/:postId/:userId")
  .post(authenticateUser, comment);

router.route("/:id").delete(authenticateUser, deletePost);
router.route("/:id").get(authenticateUser, singlePost); // where are you

module.exports = router;
