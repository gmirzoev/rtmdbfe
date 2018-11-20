import * as React from 'react'
import reduxForm, { InjectedFormProps } from 'redux-form/lib/reduxForm'
import Field, { WrappedFieldProps } from 'redux-form/lib/Field'
import * as styles from './SearchForm.scss'

interface ISearchForm {
  search: string;
}

const validate = (values: ISearchForm) => {
  const errors: Partial<ISearchForm> = {}
  if (!values.search) {
    errors.search = 'There is nothing to search'
  }
  return errors
}

interface ISearchFieldProps {
  type: string;
}

class RenderSearchField extends React.Component<ISearchFieldProps & WrappedFieldProps> {
  searchInput: HTMLInputElement|null = null

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

class SearchForm extends React.Component<InjectedFormProps<ISearchForm>> {
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
          component={RenderSearchField}
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
