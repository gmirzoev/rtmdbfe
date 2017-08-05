// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from 'actions/authActions';
import LoginForm from './LoginForm';
import * as styles from './LoginPage.scss';

class LoginPage extends Component {
  props: loginPageProps;

  handleLoginSubmit = (values: loginFormValues): void => {
    this.props.loginHandler(values.login, values.password);
  };

  render() {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginPageInnerWrapper}>
          <LoginForm onSubmit={this.handleLoginSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  loginHandler: (uLogin, uPassword) => dispatch(login(uLogin, uPassword)),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
