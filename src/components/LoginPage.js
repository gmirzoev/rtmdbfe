// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from 'actions/authActions';
import LoginForm from './LoginForm';
import * as styles from './LoginPage.scss';

type loginFormValues = {
  login: string,
  password: string,
};

class LoginPage extends Component {
  props: {
    loginHandler: (string, string) => void,
  };

  handleLoginSubmit = (values: loginFormValues) => {
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
  loginHandler: (ulogin, upassword) => dispatch(login(ulogin, upassword)),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
