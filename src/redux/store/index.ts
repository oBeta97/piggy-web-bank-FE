import { combineReducers } from "redux";
import { backgroundErrorReducer } from "../reducers/BackgroundError";
import { configureStore } from "@reduxjs/toolkit";
import { IbackgroundError } from "../action";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { authReducer, AuthState } from "../reducers/tokenReducer";
import { persistStore } from "redux-persist";
import { roleReducer } from "../reducers/MeDetailsReducer";
import { Irole } from "../../interfaces/Irole";

const authPersistConfig = {
    key: "PWB_Token",
    storage, 
    whitelist: ["token"], 
};

const rolePersistConfig = {
    key: "PWB_userRole",
    storage,
    whitelist: ["userRole"]
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedRolerReducer = persistReducer(rolePersistConfig, roleReducer)


const mergedReducers = combineReducers({
    backgroundError: backgroundErrorReducer,
    auth: persistedAuthReducer,
    role: persistedRolerReducer
});


export interface Istore {
    backgroundError: IbackgroundError,
    auth: AuthState,
    role: Irole
}


export const store = configureStore({
    reducer: mergedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
          },
        }),
});


// ugly work aorund!
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const persistor = persistStore(store as any);