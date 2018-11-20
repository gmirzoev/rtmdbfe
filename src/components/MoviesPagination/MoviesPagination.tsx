import * as React from 'react'
import * as classNames from 'classnames'
import * as styles from './MoviesPagination.scss'

export const buildPagesArr = (pagesCount: number, activePage: number, visiblePages: number) => {
  let pagesArr = []

  if (pagesCount <= visiblePages) {
    pagesArr = Array.from(new Array(pagesCount), (_val, index) => index + 1)
  } else if (activePage <= Math.ceil(visiblePages / 2)) {
    pagesArr = Array.from(new Array(visiblePages), (_val, index) => index + 1)
  } else if (activePage >= pagesCount - Math.ceil(visiblePages / 2)) {
    pagesArr = Array.from(
      new Array(pagesCount),
      (_val, index) => index + 1
    )
      .slice(pagesCount - visiblePages)
  } else {
    pagesArr = Array.from(
      new Array(activePage + Math.floor(visiblePages / 2)),
      (_val, index) => index + 1
    )
      .slice(activePage - Math.ceil(visiblePages / 2))
  }
  return pagesArr
}

interface IMoviesPaginationProps {
  pagesCount: number;
  activePage: number;
  onPageChange: Function;
}

export default class MoviesPagination extends React.PureComponent<IMoviesPaginationProps> {
  render() {
    const { pagesCount, activePage, onPageChange } = this.props

    if (pagesCount <= 0) {
      return null
    }

    const visiblePagesCount = 7
    const buttonsList = buildPagesArr(pagesCount, activePage, visiblePagesCount)
      .map(btnVal => (
        <button
          key={btnVal}
          className={classNames(
            styles.moviesPaginationItem,
            { [styles.moviesPaginationItemActive]: activePage === btnVal }
          )}
          onClick={() => btnVal !== activePage && onPageChange(btnVal)}
        >
          {btnVal}
        </button>
      ))

    const goToFirstPageBtn = (
      <button
        key="&laquo;"
        className={styles.moviesPaginationItem}
        disabled={activePage === 1}
        onClick={() => onPageChange(1)}
      >
        &laquo;
      </button>
    )

    const goToLastPageBtn = (
      <button
        key="&raquo;"
        className={styles.moviesPaginationItem}
        disabled={activePage === pagesCount}
        onClick={() => onPageChange(pagesCount)}
      >
        &raquo;
      </button>
    )

    buttonsList.unshift(goToFirstPageBtn)
    buttonsList.push(goToLastPageBtn)

    return (
      <div className={styles.moviesPaginationWrapper}>
        <div className={styles.moviesPagination}>{buttonsList}</div>
      </div>
    )
  }
}
