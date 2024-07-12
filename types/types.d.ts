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
    id: string,
    title: string;
    content: string;
};

export type PublicationType = {
    publication: CardType | undefined
};

export type RouteParams = {
    id: string;
  };

export type ContentPublicationType = {
    publication: CardType | undefined,
    index: number
}


export type NavType = {
    navInfo: string[];
};

export interface ThemeProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>; // Tipo de la función setTheme
  }
