import { type User } from "firebase/auth";
import { type Status } from "@mailchimp/mailchimp_marketing";

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

// Maichampp Types
export interface Member {
  email_address: string;
  status: Status;
  email_type: "html" | "text";
  merge_fields?: {
    [key: string]: string;
  };
  tags: OptionsChampTag[];
  status_if_new: Status;
  update_existing?: boolean;
}

export interface NewUserChamp {
  members: Member[];
}

type ErrorChamp = {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
};

export interface ErrorResponseHelper {
  err: boolean;
  status: string;
  statusText: string;
  message?: ErrorChamp;
}

type OptionsChampTag = "GROUP_CLASS" | "PRIVATE_CLASS" | "FREE_CLASS";
interface TagMailchamp {
  name: OptionsChampTag;
  status: "active" | "inactive";
}
