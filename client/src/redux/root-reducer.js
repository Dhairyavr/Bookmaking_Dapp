import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootreducer = combineReducers({
  user: userReducer,
});

export default persistReducer({ storage, key: "user1" }, rootreducer);
