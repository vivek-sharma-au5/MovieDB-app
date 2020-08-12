import React, { Component } from "react";
import "./Scss/App.css";
import Movies from "./components/movies";
import Tvshows from "./components/tvshows";
import Movieinfo from "./components/movie_info";
import Showsinfo from "./components/shows_info";
import Navbar from "./components/navbar";
import { bindActionCreators } from "redux";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMovieAPI } from "./Redux/actions/action";
import { fetchTvAPI } from "./Redux/actions/actiontv";
import { getMovieInfo } from "./Redux/actions/movieinfo";
import { getShowsInfo } from "./Redux/actions/showsinfo";

class App extends Component {
  // componentDidMount() {
  //   this.props.fetchMovieAPI();
  //   this.props.fetchTvAPI();
  // }
  movieInfo(id) {
    this.props.getMovieInfo(id);
  }
  showsInfo(id) {
    this.props.getShowsInfo(id);
  }

  render() {
    console.log("in app component", this.props.results);
    return (
      <BrowserRouter>
        <div className='wrapper'>
          <Navbar />
          <Route path='/'>
            <Redirect to='/movie' />
          </Route>
          <Route path='/movie'>
            <Movies />
          </Route>
          <Route path={`/movies/${this.props.routeMovie}`}>
            <Movieinfo />
          </Route>
          <Route path='/tvshow'>
            <Tvshows />
          </Route>
          <Route path={`/tvshows/${this.props.routeShow}`}>
            <Showsinfo />
          </Route>
        </div>
      </BrowserRouter>
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
    },
    dispatch
  );
};

export default connect(getDataFromRedux, giveActionsToRedux)(App);
