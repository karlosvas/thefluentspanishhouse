import { Schema, model, Document } from 'mongoose';
import { Comment, PublicationCardType } from '../../types/types';

const commentSchema = new Schema<Comment>({
  _id: { type: Schema.Types.ObjectId, required: true },
  pattern_id: { type: String, required: true },
  owner: {
    uid: { type: String, required: true },
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    photoURL: { type: String, required: false },
  },
  data: { type: String, required: true },
  likes: { type: Number, required: true },
  likedBy: { type: [String], required: true, default: [] },
  answers: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    required: true,
    default: [],
  },
});

export const modelComment = model('Comment', commentSchema, 'comments');

const publicationBlogSchema = new Schema<PublicationCardType>({
  _id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  base64_img: { type: String, required: false },
  currentPage: { type: Number, required: true },
});

export const modelPublication = model(
  'PublicationBlog',
  publicationBlogSchema,
  'publications'
);
