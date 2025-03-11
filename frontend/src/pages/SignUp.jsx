import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signStart, signSuccess, signFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignUp() {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input form
    if (!formData.username || !formData.email || !formData.password) {
      return dispatch(
        signFailure("Harap lengkapi semua kolom untuk melanjutkan pendaftaran.")
      );
    }

    try {
      dispatch(signStart());

      // Mengirim permintaan POST ke endpoint signup
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Jika respons tidak OK, tampilkan pesan error
      if (!res.ok) {
        const errorData = await res.json();
        dispatch(
          signFailure(errorData.message || "Terjadi kesalahan saat mendaftar.")
        );
        return;
      }

      // Jika berhasil, navigasi ke halaman sign-in
      const data = await res.json();
      dispatch(signSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      console.log(error.message);
      dispatch(signFailure("Terjadi kesalahan saat mendaftar."));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Thanos
            </span>
            Blogs
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga hic
            eius earum ducimus rem accusamus.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Masukkan Username"></Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Masukkan Email"></Label>
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Masukkan Password"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              )}
              {!loading && "Sign Up"}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span className="">Sudah punya akun?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
