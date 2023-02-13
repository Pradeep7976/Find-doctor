import { combineReducers } from "redux";
import changeTheNumber from "./up";
import changefname from "./fn";
import changeLname from "./ln";
import changepid from "./pid";
const reducers = combineReducers({
  changeTheNumber,
  changefname,
  changeLname,
  changepid,
});
export default reducers;
