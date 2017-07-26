import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from 'actions/authActions';
import LoginForm from './LoginForm';
import * as styles from './LoginPage.scss';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleLoginSubmit(values) {
    this.props.loginHandler(values.login, values.password);
  }

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

LoginPage.propTypes = {
  loginHandler: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loginHandler: (ulogin, upassword) => dispatch(login(ulogin, upassword)),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
