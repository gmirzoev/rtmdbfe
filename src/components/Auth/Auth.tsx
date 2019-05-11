import React from 'react'
import { connect } from 'react-redux'
import { login } from 'state/actions'
import Footer from 'components/Footer'
import AuthForm from './AuthForm'
import { IFormValues } from './AuthForm.interfaces'
import {
  IAuthDispatchProps as IDispatchProps,
  IAuthProps as IProps,
  IAuthState as IState
} from './Auth.interfaces'
import styles from './Auth.scss'

export class Auth extends React.Component<IProps, IState> {
  state = {
    users: [ // Demo users for auth page
      { name: 'John', role: 'user', login: 'john' },
      { name: 'Kate', role: 'user', login: 'kate' },
      { name: 'Monty', role: 'admin', login: 'monty' }
    ]
  }

  handleAuthSubmit = (values: IFormValues) => {
    this.props.login(values.login)
  }

  render() {
    return (
      <div className={styles.auth}>
        <div className={styles.authAvailableUsers}>
          <div className={styles.authAvailableUsersTitle}>Available users list</div>
          <div>
            {this.state.users.map(user => (
              <div
                key={user.login}
                className={styles.authAvailableUsersItem}
              >
                {`{ login: ${user.login} }`}
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

const mapDispatchToProps: IDispatchProps = { login }

export default connect(null, mapDispatchToProps)(Auth)
