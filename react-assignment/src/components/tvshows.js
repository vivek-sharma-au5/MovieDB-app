import React from "react";
import "../Scss/App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTvAPI } from "../Redux/actions/actiontv";
import { getShowsInfo } from "../Redux/actions/showsinfo";
import { searchShows } from "../Redux/actions/searchShows";
import Pagination from "react-js-pagination";

class Tvshows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  componentDidMount() {
    this.props.fetchTvAPI(this.state.activePage);
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    this.props.fetchTvAPI(pageNumber);
  }

  showsInfo(id) {
    this.props.getShowsInfo(id);
  }
  render() {
    return (
      <div>
        {this.props.search_query === "" ? (
          <div className='title'>Popular TV Shows</div>
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
          {this.props.shows.map((show, index) => (
            <div>
              <div key={index} className='card' style={{ width: "15rem" }}>
                <img
                  className='card-img-top'
                  src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                  alt=''
                />
                <div className='card-body'>
                  <Link to={`/tvshows/${show.name}`}>
                    <h5
                      className='card-title'
                      onClick={() => this.showsInfo(show.id)}>
                      {show.name}
                    </h5>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {this.props.results2.map((result, index) => (
            <div>
              <div key={index} className='card' style={{ width: "15rem" }}>
                <img
                  className='card-img-top'
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt=''
                />
                <div className='card-body'>
                  <Link to={`/tvshows/${result.name}`}>
                    <h5
                      className='card-title'
                      onClick={() => this.showsInfo(result.id)}>
                      {result.name}
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
    search_tvshows: state.movies.search_tvshows,
    shows: state.movies.tvshows,
    results2: state.movies.results2,
    search_query: state.movies.search_query,
    pages: state.movies.pages,
  };
};

const giveActionsToRedux = (dispatch) => {
  return bindActionCreators(
    {
      getShowsInfo,
      fetchTvAPI,
      searchShows,
    },
    dispatch
  );
};

export default connect(getDataFromRedux, giveActionsToRedux)(Tvshows);
