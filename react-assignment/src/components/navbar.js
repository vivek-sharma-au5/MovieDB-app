import React from "react";
import "../Scss/App.css";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchMovieAPI } from "../Redux/actions/action";
import { fetchTvAPI } from "../Redux/actions/actiontv";
import { getMovieInfo } from "../Redux/actions/movieinfo";
import { getShowsInfo } from "../Redux/actions/showsinfo";
import { searchMovies } from "../Redux/actions/search_movies";
import { searchShows } from "../Redux/actions/searchShows";

class Navbar extends React.Component {
  state = {
    searchQuery: "",
  };

  handleSearchQuery = (event) => {
    console.log("SQ", event.target.value);
    this.setState({
      searchQuery: event.target.value,
    });
  };
  handleSearch = (e) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    this.props.searchMovies(this.state.searchQuery);
    this.props.searchShows(this.state.searchQuery);
  };
  render() {
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark elegant'>
          <a className='navbar-brand' href='#'>
            <img src='https://img.icons8.com/color/48/000000/imdb.png' />
          </a>

          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#basicExampleNav'
            aria-controls='basicExampleNav'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='basicExampleNav'>
            <ul className='navbar-nav mr-auto'>
              <Link to='/movie'>
                <li className='nav-item active m-2'>Movies</li>
              </Link>
              <Link to='/tvshow'>
                <li className='nav-item m-2'>TV Shows</li>
              </Link>
            </ul>
            {}
            <form class='form-inline' onSubmit={() => this.handleSearch()}>
              <div className='md-form my-0'>
                <input
                  className='form-control mr-sm-2'
                  type='text'
                  placeholder='Search'
                  aria-label='Search'
                  onChange={(event) => this.handleSearchQuery(event)}
                />
                <button
                  onClick={(e) => {
                    this.handleSearch(e);
                  }}
                  className='btn  btn-outline-white'>
                  Search
                </button>
              </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  console.log("stateInApp", state.movies);
  return {
    currentMovie: state.movies.currentMovie,
    routeMovie: state.movies.routeMovie,
    currentMovie2: state.movies.currentMovie2,
    routeShow: state.movies.routeShow,
    films: state.movies.films,
    results: state.movies.results,
    shows: state.movies.tvshows,
    results2: state.movies.results2,
  };
};

const giveActionsToRedux = (dispatch) => {
  return bindActionCreators(
    {
      fetchMovieAPI,
      getMovieInfo,
      getShowsInfo,
      fetchTvAPI,
      searchMovies,
      searchShows,
    },
    dispatch
  );
};

export default connect(getDataFromRedux, giveActionsToRedux)(Navbar);
