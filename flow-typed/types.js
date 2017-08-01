// @flow
export type loginFormValues = {
  login: string,
  password: string,
};

export type loginFormProps = {
  handleSubmit: Function,
  _pristine: boolean,
  _reset: Function,
  submitting: boolean,
};
