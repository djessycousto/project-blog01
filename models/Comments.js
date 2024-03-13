const mongoose = require("mongoose");

// Create a separate schema for views
const CommentsSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // if you have user authentication
  timestamp: { type: Date, default: Date.now },
  content: { type: String, trim: true },
});

// CommentsSchema.index({ user: 1, post: 1 }, { index: true });
module.exports = mongoose.model("Comments", CommentsSchema);
