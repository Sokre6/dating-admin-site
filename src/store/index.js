import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import { exampleReducer } from "./slices/example";
import { authReducer } from "./slices/auth";
import { adminAccountReducer } from "./slices/adminAccounts";
import { adminReportReducer } from "./slices/adminReport";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  whitelist: ["auth"],
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    example: exampleReducer,
    auth: authReducer,
    adminAccount: adminAccountReducer,
    adminReport: adminReportReducer,
  })
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    loggerMiddleware,
  ],
});

export const persistor = persistStore(store);
export default store;
