export type TFunction = (key: string, options?: object) => string;

export interface OptionalTranslations {
  translation?: TFunction<"global", undefined>;
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
  setTheme: React.Dispatch<React.SetStateAction<string>>;
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

export interface FormPublicationProps {
  closing: boolean;
  handleChange: Handler;
  buttonName?: string;
  newPublication: PublicationCardType;
  setNewPublication: React.Dispatch<React.SetStateAction<PublicationCardType>>;
}
export interface FormSuscriberProps {
  closing: boolean;
  handleChange: Handler;
  buttonName?: string;
}

export interface EditType {
  commentText: string;
}

export type PublicationsProp = {
  publications: PublicationCardType[];
};
