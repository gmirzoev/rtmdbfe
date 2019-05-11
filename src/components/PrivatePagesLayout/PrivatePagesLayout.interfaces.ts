export interface IPrivatePagesLayoutProps {
  isAppInitialized: boolean;
  initializationError: boolean;
  isNavigationVisible: boolean;
  handleHideNavigation(): void;
  handleToggleNavigation(): void;
  handleLogout(): void;
  getTmdbConfig(): void;
}
