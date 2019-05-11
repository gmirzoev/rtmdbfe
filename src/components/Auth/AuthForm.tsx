import React from 'react'
import classNames from 'classnames'
import reduxForm from 'redux-form/lib/reduxForm'
import Field from 'redux-form/lib/Field'
import {
  IFormValues,
  IAuthInputFieldProps,
  IAuthFormProps as IProps
} from './AuthForm.interfaces'
import styles from './AuthForm.scss'

const validate = (values: IFormValues) => {
  const errors: Partial<IFormValues> = {}
  if (!values.login) {
    errors.login = 'Enter your login'
  }
  return errors
}

class AuthInputField extends React.Component<IAuthInputFieldProps> {
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
        {meta.touched && meta.error && (
          <span className={styles.authFormFieldErrorMsg}>
            {meta.error}
          </span>
        )}
      </div>
    )
  }
}

class AuthForm extends React.Component<IProps> {
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
          placeholder="Enter your login"
          component={AuthInputField}
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
