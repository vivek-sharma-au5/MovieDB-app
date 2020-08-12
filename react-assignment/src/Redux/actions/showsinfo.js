export function getShowsInfo(id) {
  console.log("in-get-info", id);
  return (dispatch) => {
    var data = fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=b991ec3735c1278ddf57a1911fea22f3&append_to_response=videos`
    );
    data.then((res) => {
      data = res.json();
      console.log("at-actions tv shows", data);
      data.then((films) => {
        console.log("id-response tv shows", films);
        dispatch({
          type: "GET_SHOWS_INFO",
          payload: films,
        });
      });
    });
  };
}
