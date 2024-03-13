const Post = require("../models/Post");
const Comments = require("../models/Comments");
const View = require("../models/Views");
const Likes = require("../models/Likes");
const path = require("path");

// one attache user id // note is on cookie

const createPost = async (req, res) => {
  // req.body.user = req.user.userId => the first part came from authenticate userObjet i mean both
  try {
    req.body.user = req.user.userId;
    const post = await Post.create(req.body);
    res.status(201).json({ post });
  } catch (error) {
    console.log(error);
  }
};

const allPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ Qt: posts.length, posts });
  } catch (error) {
    console.log(error);
  }
};

// good one use this
const singlePost = async (req, res) => {
  try {
    // const userId = req.user.userId;
    const { id: postId } = req.params;
    const post = await Post.findOne({ _id: postId })
      .populate({
        path: "likes",
      })
      .exec(); // add view and comment
    // check if not product
    // console.log(post, "controller");
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

// /////######## for test

// const singlePost = async (req, res) => {
//   try {
//     // Get user ID from req.user
//     const userId = req.user.userId;

//     // Pass user ID to Post.findOne
//     const { postId } = req.params;
//     const post = await Post.findOne({ _id: postId })
//       .populate({
//         path: "likes",
//       })
//       .exec();

//     // Check if not found
//     if (!post) {
//       res.status(404).json({ error: "Post not found" });
//       return Promise.resolve(); // Resolve the promise without a value
//     }

//     // Check if it's an API request, and send JSON response
//     if (res.headersSent) {
//       res.status(200).json({ post });
//     } else {
//       // Store post in res.locals for non-API requests
//       res.locals.post = post;
//       return Promise.resolve(post); // Resolve the promise with the post
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//     return Promise.resolve(); // Resolve the promise without a value
//   }
// };

// //######################

const editPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const post = await Post.findOneAndUpdate({ _id: postId }, req.body, {
      new: true,
      runValidators: true,
    }); // add view and comment
    // check if not product
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

const picturePost = async (req, res) => {
  if (
    !req.files ||
    !req.files.postPicture ||
    req.files.postPicture.length === 0
  ) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }

  const postPicture = req.files.postPicture; // Assuming you're handling the first file in the array

  if (!postPicture.mimetype.startsWith("image")) {
    console.log("Please upload an image");
    return res.status(400).json({ error: "Please upload an image" });
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${postPicture.name}`
  );

  try {
    await postPicture.mv(imagePath);
    const response = {
      postPicture: {
        name: postPicture.name,
        mimetype: postPicture.mimetype,
        size: Math.ceil(postPicture.size / (1024 * 1024)) + "Mo",
        path: `/uploads/${postPicture.name}`,
      },
    };

    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error moving file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deletePost = async (req, res) => {
  // res.send("delete"); this is an other way of deleting

  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    console.log("no post find, no delete");
  }
  const result = await post.remove(); // remove is causing trouble find why????
  res.status(200).json({ msg: "deleted" });
};

// array like/////////////////////////
// const likes = async (req, res) => {
//   req.body.user = req.user.userId;

//   try {
//     const postId = req.params.postId;
//     console.log(postId);
//     const post = await Post.findByIdAndUpdate(
//       postId,
//       // { $inc: { likes: 1 } },
//       { $push: { likes: { userId } } }, // adding user id, so 1 user = 1 like
//       { new: true }
//     );
//     console.log({ likes: post.likes });
//     res.json({ likes: post.likes });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const unLikes = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const post = await Post.findByIdAndUpdate(
//       postId,
//       { $pull: { likes: { userId } } },
//       { new: true }
//     );
//     res.json({ likes: post.likes });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
/////////////////////////////////////////

const likes = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    // Check if the user has already liked the post
    const existingLike = await Likes.findOne({ postId, userId });

    if (!existingLike) {
      // If the user hasn't liked the post, increment the likes count
      const post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: 1 } },
        { new: true }
      );

      // Add a new like record in the Likes model
      await Likes.create({ postId, userId });

      res.json({ likes, likes: post.likes });
    } else {
      // User has already liked the post, handle accordingly
      res.json({ message: "User has already liked the post" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getlikes = async (req, res) => {
  try {
    const like = await Likes.find();
    res.status(200).json({ likesNum: likes.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUnlikes = async (req, res) => {
  try {
    const like = await Likes.find();
    res.status(200).json({ likesNum: likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const unlike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    // Check if the user has already liked the post
    const existingLike = await Likes.findOne({ postId, userId });

    if (existingLike) {
      // If the user has liked the post, decrement the likes count
      const post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: -1 } },
        { new: true }
      );

      // Remove the like record from the Likes model
      await Likes.findOneAndDelete({ postId, userId });

      res.json({ likes, likes: post.likes });
    } else {
      // User hasn't liked the post, handle accordingly
      res.json({ message: "User has not liked the post" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// comment based on post

const comment = async (req, res) => {
  // req.body.user = req.user.userId => the first part came from authenticate userObjet i mean both
  try {
    req.body.user = req.user.userId;
    const { postId } = req.params;
    const comment = await Comments.create(req.body);
    res.status(201).json({ comment });
  } catch (error) {
    console.log(error);
  }
};

// const view = async (req, res) => {
//   // req.body.user = req.user.userId => the first part came from authenticate userObjet i mean both
//   try {
//     req.body.user = req.user.userId;
//     const { id: postId } = req.params;
//     const view = await View.create(req.body);
//     res.status(201).json({ userView: view.length });
//   } catch (error) {
//     console.log(error);
//   }
// };

const view = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    // Check if the user has already viewed the post
    const existingView = await View.findOne({ postId, userId });

    if (existingView) {
      // User has already viewed the post
      console.log("User has already viewed this post.");
      return res
        .status(409)
        .json({ error: "User has already viewed this post." });
    }

    // Record the new view
    const newView = await View.create({ postId, userId });

    res.status(201).json({ userView: newView });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllviews = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    // Check if the user has already viewed the post
    const view = await View.find();

    res.status(201).json({ userView: view, numberOfView: view.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// const deletePost = async (req, res) => {
//   // try {
//   //   const { id: postId } = req.params;
//   //   // Find the post by ID
//   //   const post = await Post.findOne({ _id: postId });
//   //   // console.log(post);
//   //   // Check if the post exists
//   //   if (!post) {
//   //     console.log("No post found, no deletion");
//   //     return res.status(404).json({ error: "Post not found" });
//   //   }
//   //   // Remove the post
//   //   await post.remove();
//   //   res.status(200).json({ msg: "Deleted" });
//   // } catch (error) {
//   //   console.error(error);
//   //   res.status(500).json({ error: "Internal Server Error" });
//   // }
// };

module.exports = {
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
};
