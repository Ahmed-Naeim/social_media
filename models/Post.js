const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const postSchema = mongoose.Schema({
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

postSchema.pre("save", async function () {
   try {
      // Find the user document and update its posts array with the new post
      const user = await mongoose
         .model("User")
         .findByIdAndUpdate(
            this.author,
            { $push: { posts: this._id } },
            { new: true }
         );
   } catch (err) {
      console.error(err);
   }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;


