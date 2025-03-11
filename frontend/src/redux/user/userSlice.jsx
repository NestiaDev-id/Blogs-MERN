import { createSlice } from "@reduxjs/toolkit";

// Initial state untuk slice user
const initialState = {
  currentUser: null, // Menyimpan data user yang sedang login
  error: null, // Menyimpan pesan error jika terjadi kesalahan
  isLoading: false, // Menyimpan status loading untuk proses async
};

// Membuat slice user dengan createSlice dari Redux Toolkit
const userSlice = createSlice({
  name: "user", // Nama slice
  initialState, // State awal
  reducers: {
    // Reducer untuk memulai proses sign in/sign up
    signStart: (state) => {
      state.isLoading = true; // Mengatur status loading menjadi true
      state.error = null; // Mengatur pesan error menjadi null
    },
    // Reducer untuk menangani suksesnya proses sign in/sign up
    signSuccess: (state, action) => {
      state.isLoading = false; // Mengatur status loading menjadi false
      state.currentUser = action.payload; // Menyimpan data user yang berhasil login
      state.error = null; // Mengatur pesan error menjadi null
    },
    // Reducer untuk menangani kegagalan proses sign in/sign up
    signFailure: (state, action) => {
      state.isLoading = false; // Mengatur status loading menjadi false
      state.error = action.payload; // Menyimpan pesan error yang diterima
    },
    // Reducer untuk menangani proses log out
    logOut: (state) => {
      state.isLoading = false; // Mengatur status loading menjadi false
      state.currentUser = null; // Menghapus data user yang sedang login
      state.error = null; // Mengatur pesan error menjadi null
    },
  },
});

// Mengekspor actions yang dihasilkan oleh createSlice
export const { signStart, signSuccess, signFailure, logOut } =
  userSlice.actions;

// Mengekspor reducer yang dihasilkan oleh createSlice
export default userSlice.reducer;
