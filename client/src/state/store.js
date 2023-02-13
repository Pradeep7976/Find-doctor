import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
// export const store = createStore(reducers, {}, applyMiddleware(thunk));
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
