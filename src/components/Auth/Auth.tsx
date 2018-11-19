import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { login } from 'actions/authActions'
import Footer from 'components/Footer'
import AuthForm from './AuthForm'
const styles = require('./Auth.scss')

interface IAuthProps {
  authHandler(name: string, password: string): void
}

interface IAuthState {
  users: IUser[]
}

export class Auth extends React.Component<IAuthProps, IAuthState> {
  state = {
    users: JSON.parse(localStorage.getItem('users') || '[]')
  }

  handleAuthSubmit = (values: ICredentials) => {
    this.props.authHandler(values.login, values.password)
  }

  render() {
    return (
      <div className={styles.auth}>
        <div className={styles.authAvailableUsers}>
          <div className={styles.authAvailableUsersTitle}>Available users list</div>
          <div>
            {this.state.users && this.state.users.map((user: IUser) => (
              <div
                key={user.login}
                className={styles.authAvailableUsersItem}
              >
                {`{ login: ${user.login}, password: ${user.password} }`}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.authInnerWrapper}>
          <AuthForm onSubmit={this.handleAuthSubmit} />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authHandler: (name: string, password: string) => { dispatch(login(name, password)) }
})

export default connect(undefined, mapDispatchToProps)(Auth)
