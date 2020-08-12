export function fetchTvAPI(page) {
  return (dispatch) => {
    var data = fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=b991ec3735c1278ddf57a1911fea22f3&page=${page}`
    );
    data.then((res) => {
      data = res.json();
      console.log("at-actions-tv", data);
      data.then((tvshows) => {
        dispatch({
          type: "TV_SHOWS",
          payload: tvshows.results,
        });
        dispatch({
          type: "PAGES",
          payload: tvshows.total_results,
        });
      });
    });
  };
}
