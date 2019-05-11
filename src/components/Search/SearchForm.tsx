import React from 'react'
import reduxForm from 'redux-form/lib/reduxForm'
import Field from 'redux-form/lib/Field'
import {
  IFormData,
  ISearchInputFieldProps,
  ISearchFormProps as IProps
} from './SearchForm.interfaces'
import styles from './SearchForm.scss'

const validate = (values: IFormData) => {
  const errors: Partial<IFormData> = {}
  if (!values.search) {
    errors.search = 'There is nothing to search'
  }
  return errors
}

class SearchInputField extends React.Component<ISearchInputFieldProps> {
  searchInput: HTMLInputElement | null = null

  componentDidMount() {
    if (this.searchInput) {
      this.searchInput.focus()
    }
  }

  render() {
    const { type, input, meta } = this.props
    return (
      <div className={styles.searchFormInputWrapper}>
        <input
          {...input}
          className={styles.searchFormInput}
          placeholder="Search..."
          type={type}
          ref={searchInput => { this.searchInput = searchInput }}
        />
        {meta.active && meta.touched && meta.submitFailed && meta.error &&
          <span className={styles.searchFormError}>{meta.error}</span>
        }
      </div>
    )
  }
}

class SearchForm extends React.Component<IProps> {
  render () {
    const { handleSubmit, submitting } = this.props
    return (
      <form
        className={styles.searchForm}
        onSubmit={handleSubmit as any} // tslint:disable-line no-any
      >
        <Field
          name="search"
          type="text"
          component={SearchInputField}
        />
        <button
          className={styles.searchFormBtn}
          type="submit"
          disabled={submitting}
        >
          Search
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'search',
  validate,
  initialValues: {
    search: ''
  }
})(SearchForm)
