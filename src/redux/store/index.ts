import { combineReducers } from "redux";
import { backgroundErrorReducer } from "../reducers/BackgroundError";
import { configureStore } from "@reduxjs/toolkit";
import { IbackgroundError } from "../action";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { authReducer, AuthState } from "../reducers/tokenReducer";
import { persistStore } from "redux-persist";

const authPersistConfig = {
    key: "PWB_Token",
    storage, // Redux Persist usa localStorage
    whitelist: ["token"], // Persisti solo il campo token
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);


const mergedReducers = combineReducers({
    backgroundError: backgroundErrorReducer,
    auth: persistedAuthReducer
});


export interface Istore {
    backgroundError: IbackgroundError,
    auth: AuthState
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