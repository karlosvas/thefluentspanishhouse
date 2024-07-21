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

const cardBlogSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const priceCardSchema = new Schema({
  type: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  features: [String],
});

const translationSchema = new Schema({
  language: { type: String, required: true },
  namespace: { type: String, required: true },
  translations: {
    title: { type: String },
    descriptionTitle: { type: String },
    navInfo: [String],
    hamburger: [String],
    buttons: [String],
    cardsBlog: [cardBlogSchema],
    contact: [String],
    pricing: [priceCardSchema],
  },
});

export const moodelTranslation = model(
  "Translation",
  translationSchema,
  "translations"
);
