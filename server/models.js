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

const cardBlogSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true },
    base64_img: { type: String, required: false },
  },
  { _id: false }
);

const priceCardSchema = new Schema(
  {
    type: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    features: [String],
  },
  { _id: false }
);

const translationSchema = new Schema({
  _id: { type: String, required: true },
  language: { type: String, required: true },
  namespace: { type: String, required: true },
  translations: {
    title: { type: String },
    descriptionTitle: { type: String },
    aboutme: [String],
    navInfo: [String],
    hamburger: [String],
    buttons: [String],
    cardsBlog: [cardBlogSchema],
    contact: [String],
    pricing: [priceCardSchema],
    inscriptions: [String],
    terms: {
      title: { type: String },
      content: { type: String },
    },
    privacy: {
      privacy: { type: String },
      title: { type: String },
      effectiveDate: { type: String },
      content: { type: String },
    },
  },
});

export const modelTranslation = model(
  "Translation",
  translationSchema,
  "translations"
);
