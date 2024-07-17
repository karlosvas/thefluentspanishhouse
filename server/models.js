import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  id_comment: String,
  id_publication: String,
  id_user: String,
  email: String,
  img: String,
  data: String,
});

export const modelComment = model("Comment", commentSchema, "comments");
