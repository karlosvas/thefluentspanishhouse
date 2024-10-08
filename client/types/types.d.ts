import { type User } from "firebase/auth";

declare global {
  interface Window {
    isMultiSelectTagInitialized: boolean;
  }
}

export interface CardsPublicationBlogProps {
  cardsBlog: PublicationCardType[];
  setCardsBlog: React.Dispatch<React.SetStateAction<PublicationCardType[]>>;
  handlePublicationChange: Handler;
  loading: boolean;
}

export interface ShowPasswordProps {
  password: string;
  setID: Dispatch<
    SetStateAction<{
      username: string;
      password: string;
      email: string;
    }>
  >;
}

export interface PaginationProps {
  page: string | undefined;
  cardsBlog: PublicationCardType[];
}

export interface ButtonProps {
  id?: string;
  type?: "submit";
  ref?: React.Ref<HTMLButtonElement>;
  event?: () => void;
  ref?: React.Ref<HTMLButtonElement>;
  children: ReactNode;
  suscribe?: boolean;
  className?: string;
}

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
  consentEmails: false;
  acceptTerms: false;
  acceptPrivacy: false;
  [key: string]: unknown;
}

export interface NesletterType {
  email: string;
  name: string;
  surnames: string;
  birthday?: string;
  preferences?: string[];
  privacy: boolean;
  newsletter: boolean;
  mailchimp: boolean;
  [key: string]: unknown;
}

export interface SingleThemeProps {
  children?: React.ReactNode;
}

export type PublicationType = {
  publication: CardType | undefined;
};

export type RouteParams = {
  id: string;
};

export interface ThemeProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  children?: ReactNode;
}

export type ChildrenType = {
  children?: ReactNode;
};

interface OptionalClass {
  children?: ReactNode;
  optionalClass?: string;
}

export interface LikesProps {
  initialLikes: number;
  commentId: ObjectId;
  userId: string;
}

export interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
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
  likedBy: string[];
  answers: Comment[];
}

export interface UserContextType {
  user: User | null;
}

export interface ThemeContextType {
  theme: string;
}

export interface CommentOptionsProps {
  user: User | null;
  isResponse: boolean;
  setIsResponse: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CommentCardProps {
  comment: Comment;
  user: User | null;
  openTread: boolean;
  setOpenTread: React.Dispatch<React.SetStateAction<boolean>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  comments: Comment[];
  depth: number;
}

export interface AuthProps {
  onLoginChange: (isLoggedIn: boolean) => void;
  logged: boolean;
}

type HandleSubscribeChange = () => void;
type HandlePublicationChange = () => void;
type Handler = HandleSubscribeChange | HandlePublicationChange;

export interface PlaceholderProps {
  src: string;
  className: string;
  alt?: string;
  areaLabel?: string;
  children?: ReactNode;
}

export interface ButtonCloseProps {
  handleSusribeChange: Handler | Promise<void>;
  className?: string;
}
export interface BackdropProps {
  handleSusribeChange: Handler;
  closing: boolean;
}
export interface FormPublicationProps {
  closing: boolean;
  handleChange: Handler;
  buttonName?: string;
  cardsBlog: PublicationCardType[];
  setCardsBlog: Dispatch<SetStateAction<PublicationCardType[]>>;
}
export interface FormSuscriberProps {
  closing: boolean;
  handleSusribeChange: Handler;
  buttonName?: string;
}

export type PublicationsProp = {
  publications: PublicationCardType[];
};

export interface NoteType {
  email_user: string | undefined;
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

export interface EditType {
  commentText: string;
  event: (index: number) => void;
  index: number;
  state: bolean;
}

// Maichampp Types

type Status = "subscribed" | "unsubscribed" | "cleaned" | "pending";

export interface Member {
  email_address: string;
  status: Status;
  email_type: "html" | "text";
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

type OptionsChampTag = "GROUP_CLASS" | "PRIVATE_CLASS" | "FREE_CLASS";
interface TagMailchamp {
  name: OptionsChampTag;
  status: "active" | "inactive";
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
  type: string;
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

// MultiSelectTagOptions
export interface MultiSelectTagOptions {
  shadow?: boolean;
  rounded?: boolean;
  tagColor?: {
    textColor?: string;
    borderColor?: string;
    bgColor?: string;
  };
  placeholder?: string;
  onChange?: (selectedValues: { label: string; value: string }[]) => void;
}

export interface Option {
  value: string;
  label: string;
  selected: boolean;
}
