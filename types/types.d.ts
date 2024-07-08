export type TFunction = (key: string, options?: object) => string;

export interface  Translations {
    translation: TFunction<"global", undefined>;
}

export interface ButtonProps {
    children: ReactNode;
    event?: () => void;
    id?: string;
    type?: "submit";
}

export type CardType = {
    title: string;
    content: string;
};

export type PublicationType = {
    publication: {
        title: string;
        content: string;
    }
};

export type RouteParams = {
    id: string;
  };
