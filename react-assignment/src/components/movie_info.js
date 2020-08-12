import React from "react";
import "../Scss/App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchMovieAPI } from "../Redux/actions/action";
import { getMovieInfo } from "../Redux/actions/movieinfo";

class Movieinfo extends React.Component {
  render() {
    return (
      <div>
        <div className='row4'>
          <div className='imageDiv'>
            <img
              src={`https://image.tmdb.org/t/p/w300${this.props.currentMovie.poster_path}`}
              alt=''
            />
          </div>
          <div className='description'>
            <ul>
              <li>
                <h1>{this.props.currentMovie.title}</h1>
              </li>
              <li>
                <h5 style={{ color: "grey" }}>
                  {this.props.currentMovie.tagline}
                </h5>
              </li>
              <hr />
              {this.props.currentMovie.vote_average > 5 ? (
                <li style={{ color: "green" }}>
                  <strong>
                    <i class='fas fa-star amber-text'></i>{" "}
                  </strong>{" "}
                  {this.props.currentMovie.vote_average}
                </li>
              ) : (
                <li style={{ color: "red" }}>
                  <strong>
                    <i class='fas fa-star amber-text'></i>{" "}
                  </strong>{" "}
                  {this.props.currentMovie.vote_average}
                </li>
              )}

              <li>RELEASED - {this.props.currentMovie.release_date}</li>
              <br />
              <li>
                <h5>OVERVIEW</h5>
              </li>
              <li>{this.props.currentMovie.overview}</li>
            </ul>
          </div>
        </div>
        {this.props.trailer ? (
          <div>
            <div className='trailer-heading col-4 offset-4'>Watch Trailer</div>
            <div className='video-div'>
              <iframe
                src={`//www.youtube.com/embed/${this.props.trailer}`}
                allowFullScreen></iframe>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  console.log("ddddd", state.movies.currentMovie.genres);
  return {
    currentMovie: state.movies.currentMovie,
    genres: state.movies.currentMovie.genres,
    trailer: state.movies.trailer,
  };
};

const giveActionsToRedux = (dispatch) => {
  return bindActionCreators(
    {
      fetchMovieAPI,
      getMovieInfo,
    },
    dispatch
  );
};

export default connect(getDataFromRedux, giveActionsToRedux)(Movieinfo);
