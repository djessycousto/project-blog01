const Post = require("../models/Post");
const Comments = require("../models/Comments");
const View = require("../models/Views");
const Likes = require("../models/Likes");
const path = require("path"); // Move the allPosts function outside the route file

const fetchAllPosts = async () => {
  try {
    const posts = await Post.find();
    return { Qt: posts.length, posts };
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it in the route handler
  }
};

module.exports = { fetchAllPosts };
