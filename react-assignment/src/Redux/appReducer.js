let initialState = {
  films: [],
  tvshows: [],
  results: [],
  results2: [],
  currentMovie: [],
  currentMovie2: [],
  routeMovie: "",
  routeShow: "",
  search_movies: false,
  search_tvshows: false,
  search_query: "",
  pages: [],
  trailer: [],
};

function appReducerFunction(state = initialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "MOVIES":
      stateCopy.films = action.payload;
      return stateCopy;
    case "TV_SHOWS":
      stateCopy.tvshows = action.payload;
      return stateCopy;
    case "LOAD_MORE":
      for (let i = 0; i < 20; i++) {
        stateCopy.results = [...stateCopy.results, action.payload[i]];
      }
      return stateCopy;
    case "LOAD_MORE_SHOWS":
      for (let i = 0; i < 20; i++) {
        stateCopy.results2 = [...stateCopy.results2, action.payload[i]];
      }
      return stateCopy;

    case "GET_INFO":
      var vids = action.payload.videos.results;
      if (vids.length === 0) {
        stateCopy.currentMovie = action.payload;
        stateCopy.trailer = "";
      }
      if (vids.length !== 0) {
        stateCopy.currentMovie = action.payload;
        stateCopy.trailer = vids[0].key;
      }
      return stateCopy;

    case "GET_SHOWS_INFO":
      var vids2 = action.payload.videos.results;
      if (vids2.length === 0) {
        stateCopy.currentMovie2 = action.payload;
        stateCopy.trailer = "";
      }
      if (vids2.length !== 0) {
        stateCopy.currentMovie2 = action.payload;
        stateCopy.trailer = vids2[0].key;
      }
      return stateCopy;

    case "SEARCH_MOVIES":
      if (action.payload) {
        var filteredSearchResults = action.payload.filter(
          (show) => show.poster_path !== null
        );
      }
      stateCopy.films = filteredSearchResults;
      stateCopy.search_movies = true;
      for (let i = 0; i < 20; i++) {
        stateCopy.results = [...stateCopy.results, filteredSearchResults[i]];
      }

      return stateCopy;

    case "SEARCH_SHOWS":
      const filteredSearchResults2 = action.payload.filter(
        (show) => show.poster_path !== null
      );
      stateCopy.tvshows = filteredSearchResults2;
      stateCopy.search_tvshows = true;

      for (let i = 0; i < 20; i++) {
        stateCopy.results2 = [...stateCopy.results2, filteredSearchResults2[i]];
      }

      return stateCopy;

    case "SEARCH_QUERY":
      stateCopy.search_query = action.payload;
      return stateCopy;

    case "PAGES":
      const pageLinks = [];
      for (let i = 1; i <= action.payload; i++) {
        pageLinks.push(i);
      }
      stateCopy.pages = action.payload;

      return stateCopy;
    default:
      return stateCopy;
  }
}

export default appReducerFunction;
