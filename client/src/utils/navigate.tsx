export const handleClickNavigate =
  (
    path: string,
    navigate: (
      path: string,
      options?: { replace?: boolean; state?: unknown }
    ) => void
  ) =>
  (event: React.MouseEvent<HTMLAnchorElement>) => {
    location.pathname === path ? event.preventDefault() : navigate(path);
  };
