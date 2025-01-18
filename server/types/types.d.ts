import { type User } from 'firebase/auth';
import { type Status } from '@mailchimp/mailchimp_marketing';
import { ObjectId } from 'mongoose';

export interface PublicationCardType {
  _id: Types.ObjectId;
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
  class: OptionsChampTag;
  consentEmails: boolean;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  [key: string]: unknown;
}

export interface ErrorAxios {
  status: number;
  message: string;
}

export interface Comment {
  _id: Types.ObjectId;
  pattern_id: string;
  owner: {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
  };
  data: string;
  likes: number;
  likedBy: string[] | undefined;
  answers: ObjectId[] | undefined;
}

export interface NoteType {
  email_user: string;
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
  email_type: 'html' | 'text';
  merge_fields: {
    FNAME: string;
    LNAME: string;
    [key: string]: string;
  };
  interests?: {
    [key: string]: boolean;
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

type OptionsChampTag = 'GROUP_CLASS' | 'PRIVATE_CLASS' | 'FREE_CLASS';
interface TagMailchamp {
  name: OptionsChampTag;
  status: 'active' | 'inactive';
}

interface Link {
  rel: string;
  href: string;
  method: string;
  targetSchema?: string;
  schema?: string;
}

interface Category {
  list_id: string;
  id: string;
  title: string;
  display_order: number;
  tyº: string;
  _links: Link[];
}

export interface InterestCategoryResponse {
  list_id: string;
  categories: Category[];
  total_items: number;
  _links: Link[];
}

interface Interest {
  category_id: string;
  list_id: string;
  id: string;
  name: string;
}
export interface InterestResponse {
  _links: Link[];
  category_id: string;
  interests: Interest[];
  list_id: string;
  total_items: number;
}

// Mandril
export interface Message {
  from_email: string;
  from_name: string;
  to: [
    {
      email: string;
      type: 'to' | 'cc' | 'bcc';
    },
  ];
  subject: string;
  html: string;
  headers?: {
    'Reply-To': string;
  };
}
