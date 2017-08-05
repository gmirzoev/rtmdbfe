// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = (values: loginFormValues) => {
  const errors = {};

  if (!values.login) {
    errors.login = 'Enter your login';
  }

  if (!values.password) {
    errors.password = 'Enter your password';
  }

  return errors;
};

const RenderInputField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div>
    <input
      {...input}
      placeholder={placeholder}
      type={type}
    />
    {touched && error && <span>{error}</span>}
  </div>
);

const LoginForm = ({ handleSubmit, submitting }) => (
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

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
