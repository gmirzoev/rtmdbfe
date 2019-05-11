import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { IAppState } from 'state'
import { getTmdbConfig, hideNavigation, toggleNavigation, logout } from 'state/actions'
import { selectInitialized, selectInitError, selectNavigationVisible } from 'state/selectors'
import Header from 'components/Header'
import Navigation from 'components/Navigation'
import Main from 'components/Main'
import Footer from 'components/Footer'
import LoadingIndicator from 'components/LoadingIndicator'
import AppInitError from 'components/AppInitError'
import { IPrivatePagesLayoutProps as IProps } from './PrivatePagesLayout.interfaces'
import styles from './PrivatePagesLayout.scss'

class PrivatePagesLayout extends React.Component<IProps> {
  navigationEl: HTMLElement | null = null
  links = [
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
  isAppInitialized: selectInitialized(state),
  initializationError: selectInitError(state),
  isNavigationVisible: selectNavigationVisible(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleHideNavigation: () => { dispatch(hideNavigation()) },
  handleToggleNavigation: () => { dispatch(toggleNavigation()) },
  handleLogout: () => { dispatch(logout()) },
  getTmdbConfig: () => { dispatch(getTmdbConfig()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivatePagesLayout)
