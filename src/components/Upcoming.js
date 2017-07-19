import { connect } from 'react-redux';
import getMovies from 'actions/moviesActions';
import Movies from './Movies';


const mapStateToProps = state => ({
  movies: state.movies,
});

const mapDispatchToProps = dispatch => ({
  getMovies: page => dispatch(getMovies('upcoming', page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
