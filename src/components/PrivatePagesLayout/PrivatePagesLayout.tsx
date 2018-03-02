import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { getTmdbConfig } from 'actions/initActions'
import { toggleNavigation } from 'actions/uiActions'
import { hideNavigation } from 'actions/uiActions'
import { logout } from 'actions/authActions'
import { IAppState } from 'reducers'
import Header from 'components/Header'
import Navigation from 'components/Navigation'
import Main from 'components/Main'
import Footer from 'components/Footer'
import LoadingIndicator from 'components/LoadingIndicator'
import AppInitError from 'components/AppInitError'
const styles = require('./PrivatePagesLayout.scss')

export interface INavLink {
  title: string
  url: string
}

export interface IPrivatePagesLayoutProps {
  isAppInitialized: boolean
  initializationError: boolean
  isNavigationVisible: boolean
  handleHideNavigation(): void
  handleToggleNavigation(): void
  handleLogout(): void
  getTmdbConfig(): void
}

class PrivatePagesLayout extends React.Component<IPrivatePagesLayoutProps> {
  navigationEl: HTMLElement|null = null
  links: INavLink[] = [
    { title: 'Now playing', url: '/movies/now_playing' },
    { title: 'Popular', url: '/movies/popular' },
    { title: 'Top', url: '/movies/top_rated' },
    { title: 'Upcoming', url: '/movies/upcoming' },
    { title: 'Search', url: '/search' }
  ]

  componentDidMount() {
    this.props.getTmdbConfig()
    this.navigationEl = document.querySelector('nav')
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  handleDocumentClick = (e: Event) => {
    const target = e.target as HTMLElement
    const targetParent = target.parentNode as HTMLElement
    if (!this.navigationEl || this.navigationEl.contains(target) ||
      target.classList.contains('js-menu') || targetParent.classList.contains('js-menu')) { return }
    this.props.handleHideNavigation()
  }

  render() {
    const {
      isAppInitialized,
      initializationError,
      isNavigationVisible,
      handleToggleNavigation,
      handleLogout,
      children
    } = this.props

    let component = null
    if (isAppInitialized && initializationError) {
      component = <AppInitError />
    } else if (isAppInitialized && !initializationError) {
      component = children
    }

    return (
      <div className={styles.privatePagesLayout}>
        <Header
          isNavigationVisible={isNavigationVisible}
          onNavigationBtnClick={handleToggleNavigation}
        />
        <Navigation
          isVisible={isNavigationVisible}
          links={this.links}
          onLogout={handleLogout}
        />
        <Main>
          {!isAppInitialized && !initializationError ? <LoadingIndicator /> : null}
          {component}
        </Main>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state: IAppState) => ({
  isAppInitialized: state.init.isInitialized,
  initializationError: state.init.error,
  isNavigationVisible: state.ui.isNavigationVisible
})

const mapDispatchToProps = (dispatch: Dispatch<object>) => ({
  handleHideNavigation: () => { dispatch(hideNavigation()) },
  handleToggleNavigation: () => { dispatch(toggleNavigation()) },
  handleLogout: () => { dispatch(logout()) },
  getTmdbConfig: () => { dispatch(getTmdbConfig()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivatePagesLayout)
