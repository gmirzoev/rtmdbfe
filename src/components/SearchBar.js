// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as styles from './SearchBar.scss';

// todo: refactor this mess

const validate = values => {
  const errors = {};

  if (!values.search) {
    errors.search = 'There is nothing to search';
  }

  return errors;
};

class RenderSearchField extends Component {
  componentDidMount() {
    this.searchInput.focus();
  }

  props: {
    input: any;
    type: string;
    meta: Object;
  };

  searchInput: HTMLInputElement;

  render() {
    const { input, type, meta: { active, touched, submitFailed, error } } = this.props;
    return (
      <div className={styles.searchBarInputWrapper}>
        <input
          {...input}
          className={styles.searchBarInput}
          placeholder="Search..."
          type={type}
          ref={searchInput => { this.searchInput = searchInput; }}
        />
        {active && touched && submitFailed && error && <span className={styles.searchBarError}>{error}</span>}
      </div>
    );
  }
}

type searchFormType = {
  handleSubmit: Function,
  submitting: boolean,
}

const SearchForm = ({ handleSubmit, submitting }: searchFormType) => (
  <form
    className={styles.searchBar}
    onSubmit={handleSubmit}
  >
    <Field
      name="search"
      type="text"
      component={RenderSearchField}
    />
    <button
      className={styles.searchBarBtn}
      type="submit"
      disabled={submitting}
    >
      Search
    </button>
  </form>
);

export default reduxForm({
  form: 'search',
  validate,
})(SearchForm);
