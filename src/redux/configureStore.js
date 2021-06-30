import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import Post from "./modules/post"

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  post: Post,
  router: connectRouter(history),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument({ history: history })],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
