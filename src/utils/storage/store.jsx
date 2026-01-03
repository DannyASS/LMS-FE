import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import rootReducer from "./combineReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"], // reducer mana yang ingin disimpan
};

// ❗ rootReducer harus dibungkus persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // wajib untuk redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
