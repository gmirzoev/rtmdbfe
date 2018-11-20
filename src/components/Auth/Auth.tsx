import * as React from 'react'
import { connect } from 'react-redux'
import { login } from 'actions/authActions'
import Footer from 'components/Footer'
import AuthForm from './AuthForm'
import * as styles from './Auth.scss'

interface IAuthDispatchProps {
  login(name: string, password: string): void;
}

type IAuthProps = IAuthDispatchProps

interface IAuthState {
  users: IUser[];
}

export class Auth extends React.Component<IAuthProps, IAuthState> {
  state = {
    users: JSON.parse(localStorage.getItem('users') || '[]')
  }

  handleAuthSubmit = (values: ICredentials) => {
    this.props.login(values.login, values.password)
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

const mapDispatchToProps: IAuthDispatchProps = { login }

export default connect(undefined, mapDispatchToProps)(Auth)
