import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from 'redux-thunk'
import rootReducer from "./rootReducer";
import { persistStore } from "redux-persist"

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, composedEnhancer);

export const persistor = persistStore(store);