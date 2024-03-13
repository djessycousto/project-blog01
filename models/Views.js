const mongoose = require("mongoose");

// Create a separate schema for views
const viewSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // if you have user authentication
  timestamp: { type: Date, default: Date.now },
});

viewSchema.index({ views: 1, post: 1 }, { index: true });
module.exports = mongoose.model("View", viewSchema);
