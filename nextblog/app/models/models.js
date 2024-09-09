import mongoose, { model, mongo } from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Blog = mongoose.models.Blog || mongoose.model("blog", blogSchema);

export default Blog;
