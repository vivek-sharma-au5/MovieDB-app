import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import appReducerFunction from "./appReducer";

const rootReducer = combineReducers({
  movies: appReducerFunction,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
