import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};

  if (!values.login) {
    errors.login = 'Enter your login';
  }

  if (!values.password) {
    errors.password = 'Enter your password';
  }

  return errors;
};

const RenderInputField = ({ input, type, placeholder, meta: { touched, error } }) => ( // eslint-disable-line
  <div>
    <input
      {...input}
      placeholder={placeholder}
      type={type}
    />
    {touched && error && <span>{error}</span>}
  </div>
);

const LoginForm = ({ handleSubmit, _pristine, _reset, submitting }) => (
  <form
    onSubmit={handleSubmit}
  >
    <Field
      name="login"
      type="text"
      placeholder="Login..."
      component={RenderInputField}
    />
    <Field
      name="password"
      type="password"
      placeholder="Password..."
      component={RenderInputField}
    />
    <button
      type="submit"
      disabled={submitting}
    >
      Login
    </button>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  _pristine: PropTypes.bool,
  _reset: PropTypes.func,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
