import { User } from "firebase/auth";

export type TFunction = (key: string, options?: object) => string;

export interface OptionalTranslations {
  translation?: TFunction<"global", undefined>;
}

export interface CardsPublicationBlogProps {
  cardsBlog: PublicationCardType[];
  setCardsBlog: React.Dispatch<React.SetStateAction<PublicationCardType[]>>;
  handlePublicationChange: Handler;
  loading: boolean;
}

export interface ButtonProps {
  id?: string;
  type?: "submit";
  ref?: React.Ref<HTMLButtonElement>;
  event?: () => void;
  ref?: React.Ref<HTMLButtonElement>;
  children: ReactNode;
}

export interface PublicationCardType {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  base64_img: string;
}

export interface SubscriberType {
  name: string;
  lastname: string;
  email: string;
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

export interface Comment {
  id_comment: string;
  id_publication: string;
  id_user: string;
  email: string;
  img: string | null;
  data: string;
}

export interface AuthProps {
  onLoginChange: (isLoggedIn: boolean) => void;
  logged: boolean;
}

type HandleSubscribeChange = () => void;
type HandlePublicationChange = () => void;
type Handler = HandleSubscribeChange | HandlePublicationChange;

export interface PlaceholderProps {
  id?: string;
  className?: string;
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
  newPublication: PublicationCardType;
  setNewPublication: Dispatch<SetStateAction<PublicationCardType>>;
  cardsBlog: PublicationCardType[];
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

export interface EditType {
  commentText: string;
  event: (index: number) => void;
  index: number;
  state: bolean;
}
