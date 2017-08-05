// @flow
declare var process: {
  env: {
    TMDB_CONFIG: {
      images: {
        poster_sizes: string,
        secure_base_url: string,
      },
    },
    APP_CONFIG: {
      API_HOST: stirng,
      API_VERSION: string,
      API_KEY: string,
    },
  },
};

// todo: remove as soon as import() chunk namings will work
declare var System: {
  'import': any,
};

export type appProps = {
  isRegistered: boolean,
};

export type headerProps = {
  onNavigationBtnClick: Function,
};

export type privatePageLayoutProps = {
  getAppConfig: Function,
  isAppInitialized: boolean,
  initializationError: boolean,
  isNavigationVisible: boolean,
  handleToggleNavigation: Function,
  handleLogout: Function,
  children: any,
};

export type privatePageProps = {
  handleHideNavigation: Function,
};

export type loginFormValues = {
  login: string,
  password: string,
};

export type loginPageProps = {
  loginHandler: (string, string) => void,
};

export type movieCardProps = {
  title: string,
  poster: string,
  overview: string,
};

export type navLink = {
  title: string,
  url: string,
}

export type navigationProps = {
  isVisible: boolean,
  links: navLink[],
  onLogout: Function,
}

export type moviesPaginationProps = {
  pagesCount: number,
  activePage: number,
  onPageChange: Function,
};

export type movieItem = {
  id: number,
  title: string,
  poster_path: string,
  overview: string,
}

export type moviesListProps = {
  movies: movieItem[]
}

export type searchPageProps = {
  movies: {
    isFetching: boolean,
    items: movieItem[],
    pages: number,
  },
  searchMovies: Function,
};

export type moviesPagesProps = {
  movies: {
    isFetching: boolean,
    items: movieItem[],
    pages: number,
  },
  getMovies: Function,
}
