import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootreducer from "./root-reducer";
import { persistStore } from "redux-persist";

const middleware = [logger];
export const store = createStore(rootreducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);
