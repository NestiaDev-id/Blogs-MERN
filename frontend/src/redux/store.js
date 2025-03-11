import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Menggunakan local storage untuk menyimpan state

// Menggabungkan semua reducer menjadi satu root reducer
const rootReducer = combineReducers({
  user: userReducer, // Menambahkan userReducer ke rootReducer
});

// Konfigurasi untuk redux-persist
const persistConfig = {
  key: "root", // Key untuk root reducer
  storage, // Menggunakan local storage sebagai storage
  version: 1, // Versi dari persist config
};

// Membuat persisted reducer dengan persistConfig dan rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Membuat store dengan configureStore dari Redux Toolkit
export const store = configureStore({
  reducer: persistedReducer, // Menggunakan persistedReducer sebagai reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Menonaktifkan serializable check untuk middleware
});

// Membuat persistor untuk mengatur persist store
export const persistor = persistStore(store);
