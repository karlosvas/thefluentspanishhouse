import { type User } from "firebase/auth";

export interface PublicationCardType {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  base64_img: string;
  currentPage: number;
}

export interface SubscriberType {
  name: string;
  lastname: string;
  email: string;
  type: string;
}

export interface Comment {
  _id: ObjectId;
  pattern_id: string;
  owner: {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
  };
  data: string;
  likes: number;
  likedBy: string[];
  answers: Comment[];
}

export interface NoteType {
  email_user: string | null | undefined;
  username: string;
  subject: string;
  note: string;
}

export interface ConfigUser {
  user: User | string;
  displayName: string;
  email: string;
  password: string;
  phone: string;
}

// interfaces.ts
export interface MergeFields {
  FNAME: string;
  LNAME: string;
  INTERESTSS: string[];
}

export interface Member {
  email_address: string;
  status: "subscribed" | "unsubscribed" | "cleaned" | "pending";
  merge_fields: MergeFields;
}

export interface NewUserChamp {
  members: Member[];
}
