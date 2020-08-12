export function fetchMovieAPI(page) {
  console.log("page", page);
  return (dispatch) => {
    var data = fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=b991ec3735c1278ddf57a1911fea22f3&page=${page}`
    );
    data.then((res) => {
      data = res.json();
      console.log("at-actions", data);
      data.then((films) => {
        dispatch({
          type: "MOVIES",
          payload: films.results,
        });
        dispatch({
          type: "PAGES",
          payload: films.total_results,
        });
      });
    });
  };
}
