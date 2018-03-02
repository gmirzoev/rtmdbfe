import * as React from 'react'
import * as classNames from 'classnames'
import reduxForm, { InjectedFormProps } from 'redux-form/lib/reduxForm'
import Field, { WrappedFieldProps } from 'redux-form/lib/Field'
const styles = require('./AuthForm.scss')

const validate = (values: ICredentials) => {
  const errors: Partial<ICredentials> = {}
  if (!values.login) {
    errors.login = 'Enter your login'
  }
  if (!values.password) {
    errors.password = 'Enter your password'
  }
  return errors
}

interface IAuthInputFieldProps {
  type: string,
  placeholder: string
}

class RenderInputField extends React.Component<IAuthInputFieldProps & WrappedFieldProps> {
  render () {
    const { type, placeholder, input, meta } = this.props
    return (
      <div className={styles.authFormField}>
        <input
          {...input}
          className={classNames(styles.authFormFieldInput, {
            [styles.authFormFieldInputError]: meta.touched && meta.error
          })}
          placeholder={placeholder}
          type={type}
        />
        {meta.touched && meta.error && <span className={styles.authFormFieldErrorMsg}>{meta.error}</span>}
      </div>
    )
  }
}

class AuthForm extends React.Component<InjectedFormProps<ICredentials>> {
  render () {
    const { handleSubmit, submitting } = this.props
    return (
      <form
        className={styles.authForm}
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
          className={styles.authFormSingInBtn}
          disabled={submitting}
        >
          Sing in
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'authentication',
  validate
})(AuthForm)
