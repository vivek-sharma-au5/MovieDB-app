export function getMovieInfo(id) {
  console.log("in-get-info", id);
  return (dispatch) => {
    var data = fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=b991ec3735c1278ddf57a1911fea22f3&append_to_response=videos`
    );
    data.then((res) => {
      data = res.json();
      console.log("at-actions", data);
      data.then((films) => {
        console.log("id-response", films);
        dispatch({
          type: "GET_INFO",
          payload: films,
        });
      });
    });
  };
}
