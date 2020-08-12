import React from "react";
import "../Scss/App.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchTvAPI } from "../Redux/actions/actiontv";
import { getShowsInfo } from "../Redux/actions/showsinfo";

class Showsinfo extends React.Component {
  render() {
    return (
      <div>
        <div className='row4'>
          <div className='imageDiv'>
            <img
              src={`https://image.tmdb.org/t/p/w300${this.props.currentMovie2.poster_path}`}
              alt=''
            />
          </div>
          <div className='description'>
            <ul>
              <li>
                {/* {this.props.currentMovie2.map((ele, index) => (
                  <h1>{ele.genres}</h1>
                ))} */}
              </li>

              <li>
                <h1>{this.props.currentMovie2.name}</h1>
              </li>
              <hr />
              <li>
                <h6 style={{ color: "grey" }}>
                  popularity: {this.props.currentMovie2.popularity}
                </h6>
              </li>

              <li>
                <h5 style={{ color: "grey" }}>
                  {this.props.currentMovie2.tagline}
                </h5>
              </li>
              <li>
                <h5 style={{ color: "grey" }}>
                  {this.props.currentMovie2.tagline}
                </h5>
              </li>
              {this.props.currentMovie2.vote_average > 5 ? (
                <li style={{ color: "green" }}>
                  <strong>
                    <i class='fas fa-star amber-text'></i>{" "}
                  </strong>{" "}
                  {this.props.currentMovie2.vote_average}
                </li>
              ) : (
                <li style={{ color: "red" }}>
                  <strong>
                    <i class='fas fa-star amber-text'></i>{" "}
                  </strong>{" "}
                  {this.props.currentMovie2.vote_average}
                </li>
              )}
              <li>{this.props.currentMovie2.release_date}</li>
              <li>{this.props.currentMovie2.overview}</li>
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
  console.log("stateInApp", state.movies.trailer);
  return {
    genres: state.movies.currentMovie2.genres,
    trailer: state.movies.trailer,
    currentMovie2: state.movies.currentMovie2,
  };
};

const giveActionsToRedux = (dispatch) => {
  return bindActionCreators(
    {
      getShowsInfo,
      fetchTvAPI,
    },
    dispatch
  );
};

export default connect(getDataFromRedux, giveActionsToRedux)(Showsinfo);
