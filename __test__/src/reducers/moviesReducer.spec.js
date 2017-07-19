import {
  GET_MOVIES_PENDING,
  GET_MOVIES_FULFILLED,
  GET_MOVIES_REJECTED,
} from 'constants/actionTypes';
import reducer, { initialState } from 'reducers/moviesReducer';

describe('moviesReducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_MOVIES_PENDING', () => {
    const expectedResult = {
      isFetching: true,
      items: [],
      pages: 0,
      error: false,
    };

    expect(reducer(
      undefined,
      { type: GET_MOVIES_PENDING },
    ))
      .toEqual(expectedResult);
  });

  it('should handle GET_MOVIES_FULFILLED', () => {
    const movies = [
      { id: 1, title: 'Some movie', description: 'Movie description' },
      { id: 1, title: 'Some movie2', description: 'Movie description2' },
      { id: 1, title: 'Some movie3', description: 'Movie description3' },
      { id: 1, title: 'Some movie4', description: 'Movie description4' },
    ];
    const expectedResult = {
      isFetching: false,
      items: movies,
      pages: movies.length,
      error: false,
    };

    expect(reducer(
      undefined,
      {
        type: GET_MOVIES_FULFILLED,
        payload: {
          movies,
          pages: movies.length,
        },
      },
    )).toEqual(expectedResult);
  });

  it('should handle GET_MOVIES_REJECTED', () => {
    const expectedResult = {
      isFetching: false,
      items: [],
      pages: 0,
      error: true,
    };

    expect(reducer(
      undefined,
      { type: GET_MOVIES_REJECTED },
    ))
      .toEqual(expectedResult);
  });
});
