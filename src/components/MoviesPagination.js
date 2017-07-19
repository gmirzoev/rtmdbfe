import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as styles from './MoviesPagination.scss';

export const buildPagesArr = (pagesCount, activePage, visiblePages) => {
  let pagesArr;

  if (pagesCount <= visiblePages) {
    pagesArr = Array.from(
      new Array(pagesCount),
      (val, index) => index + 1,
    );
  } else if (activePage <= Math.ceil(visiblePages / 2)) {
    pagesArr = Array.from(
      new Array(visiblePages),
      (val, index) => index + 1,
    );
  } else if (activePage >= pagesCount - Math.ceil(visiblePages / 2)) {
    pagesArr = Array.from(
      new Array(pagesCount),
      (val, index) => index + 1,
    )
      .slice(pagesCount - visiblePages);
  } else {
    pagesArr = Array.from(
      new Array(activePage + Math.floor(visiblePages / 2)),
      (val, index) => index + 1,
    )
      .slice(activePage - Math.ceil(visiblePages / 2));
  }

  return pagesArr;
};

class MoviesPagination extends PureComponent {
  render() {
    const { pagesCount, activePage, onPageChange } = this.props;

    if (pagesCount <= 0) {
      return null;
    }

    const visiblePagesCount = 7;
    const buttonsList = buildPagesArr(pagesCount, activePage, visiblePagesCount)
      .map(btnVal => (
        <button
          className={`${styles.moviesPaginationItem} ${activePage === btnVal ? styles.moviesPaginationItemActive : ''}`}
          key={btnVal}
          onClick={() => btnVal !== activePage && onPageChange(btnVal)}
        >
          {btnVal}
        </button>
      ));

    buttonsList.unshift(
      <button
        className={styles.moviesPaginationItem}
        key={'&laquo;'}
        disabled={activePage === 1}
        onClick={() => onPageChange(1)}
      >
        &laquo;
      </button>,
    );

    buttonsList.push(
      <button
        className={styles.moviesPaginationItem}
        key={'&raquo;'}
        disabled={activePage === pagesCount}
        onClick={() => onPageChange(pagesCount)}
      >
        &raquo;
      </button>,
    );

    return (
      <div className={styles.moviesPaginationWrapper}>
        <div className={styles.moviesPagination}>{buttonsList}</div>
      </div>
    );
  }
}

MoviesPagination.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default MoviesPagination;
