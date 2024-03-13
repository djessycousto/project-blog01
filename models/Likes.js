const mongoose = require("mongoose");

// Create a separate schema for likes
const likesSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

// Create an index on postId, userId, and likes fields
likesSchema.index({ postId: 1, userId: 1, likes: 1 }, { index: true });

module.exports = mongoose.model("Likes", likesSchema);
