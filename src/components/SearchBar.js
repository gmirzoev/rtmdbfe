import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import * as styles from './SearchBar.scss';

const validate = values => {
  const errors = {};

  if (!values.search) {
    errors.search = 'There is nothing to search';
  }

  return errors;
};

const RenderSearchField = ({ input, type, meta: { touched, error } }) => ( // eslint-disable-line
  <div className={styles.searchBarInputWrapper}>
    <input
      {...input}
      className={styles.searchBarInput}
      placeholder="Search..."
      type={type}
    />
    {touched && error && <span className={styles.searchBarError}>{error}</span>}
  </div>
);

const SearchBar = ({ handleSubmit, _pristine, _reset, submitting }) => (
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

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  _pristine: PropTypes.bool,
  _reset: PropTypes.func,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'search',
  validate,
})(SearchBar);
