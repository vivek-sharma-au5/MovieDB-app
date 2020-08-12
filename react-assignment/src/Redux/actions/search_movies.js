var pageNumber = 0;
export function searchMovies(searchQuery) {
  pageNumber++;
  console.log("counter", pageNumber, searchQuery);
  return (dispatch) => {
    var data = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b991ec3735c1278ddf57a1911fea22f3&page=${pageNumber}&query=${searchQuery}`
    );
    data.then((res) => {
      data = res.json();
      console.log("at-SearchMovie", data);
      data.then((shows) => {
        console.log("at-SearchMovie2", shows);
        dispatch({
          type: "SEARCH_MOVIES",
          payload: shows.results,
        });
        dispatch({
          type: "PAGES",
          payload: shows.total_pages,
        });
        dispatch({
          type: "SEARCH_QUERY",
          payload: searchQuery,
        });
      });
    });
  };
}
