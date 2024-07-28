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

const cardSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  base64_img: { type: String, required: false },
});

const cardBlogSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  cardsBlog: [cardSchema],
});

export const modelPublication = model(
  "CardBlog",
  cardBlogSchema,
  "publications"
);
