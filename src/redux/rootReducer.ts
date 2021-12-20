import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { authReducer } from "./auth/authReducer";
import { projectReducer } from "./project/projectReducer"; 

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "project"]
};

const rootReducer = combineReducers({
    user: authReducer,
    project: projectReducer
});


export default persistReducer(persistConfig, rootReducer);