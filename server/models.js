import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  id_comment: { type: String, required: true },
  id_publication: { type: String, required: true },
  id_user: { type: String, required: true },
  email: { type: String, required: true },
  img: { type: String, required: false },
  data: { type: String, required: true },
});
export const modelComment = model("Comment", commentSchema, "comments");

const publicationBlogSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  base64_img: { type: String, required: false },
});

export const modelPublication = model(
  "PublicationBlog",
  publicationBlogSchema,
  "publications"
);
