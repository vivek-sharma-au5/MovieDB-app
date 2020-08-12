import React from "react";
import "../Scss/App.css";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchMovieAPI } from "../Redux/actions/action";
import { getMovieInfo } from "../Redux/actions/movieinfo";
import { searchMovies } from "../Redux/actions/search_movies";
import Pagination from "react-js-pagination";

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  componentDidMount() {
    this.props.fetchMovieAPI(this.state.activePage);
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    this.props.fetchMovieAPI(pageNumber);
  }

  movieInfo(id) {
    this.props.getMovieInfo(id);
  }
  render() {
    return (
      <div>
        {this.props.search_query === "" ? (
          <div className='title'>Popular Movies</div>
        ) : (
          <div className='title'>
            Search Results for {this.props.search_query}
          </div>
        )}

        <div className='pg-div mt-4'>
          <Pagination
            itemClass='page-item'
            linkClass='page-link'
            activePage={this.state.activePage}
            itemsCountPerPage={20}
            totalItemsCount={this.props.pages}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>

        <div className='row2'>
          {this.props.films.map((movie, index) => (
            <div>
              <div key={index} className='card' style={{ width: "15rem" }}>
                <img
                  className='card-img-top'
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt=''
                />
                <div className='card-body'>
                  <Link to={`/movies/${movie.title}`}>
                    <h5
                      className='card-title'
                      onClick={() => this.movieInfo(movie.id)}>
                      {movie.title}
                    </h5>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {this.props.results.map((result, index) => (
            <div>
              <div key={index} className='card' style={{ width: "15rem" }}>
                <img
                  className='card-img-top'
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt=''
                />
                <div className='card-body'>
                  <Link to={`/movies/${result.title}`}>
                    <h5
                      className='card-title'
                      onClick={() => this.movieInfo(result.id)}>
                      {result.title}
                    </h5>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='pg-div'>
          <Pagination
            itemClass='page-item'
            linkClass='page-link'
            activePage={this.state.activePage}
            itemsCountPerPage={20}
            totalItemsCount={this.props.pages}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  console.log("stateInApp", state.movies);
  return {
    films: state.movies.films,
    results: state.movies.results,
    search_query: state.movies.search_query,
    pages: state.movies.pages,
  };
};

const giveActionsToRedux = (dispatch) => {
  return bindActionCreators(
    {
      fetchMovieAPI,
      getMovieInfo,
      searchMovies,
    },
    dispatch
  );
};

export default connect(getDataFromRedux, giveActionsToRedux)(Movies);
