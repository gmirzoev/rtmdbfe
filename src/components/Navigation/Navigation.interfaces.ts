interface INavLink {
  title: string;
  url: string;
}

export interface INavigationProps {
  isVisible: boolean;
  links: INavLink[];
  onLogout(): void;
}
