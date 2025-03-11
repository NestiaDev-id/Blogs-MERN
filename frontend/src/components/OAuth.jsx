import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signStart, signSuccess, signFailure } from "../redux/user/userSlice";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      dispatch(signStart());

      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          photo: resultFromGoogle.user.photoURL,
        }),
      });
      console.log(res);

      const data = await res.json();
      if (res.ok) {
        dispatch(signSuccess(data));
        navigate("/");
      } else {
        dispatch(
          signFailure(
            data.message || "Terjadi kesalahan saat masuk dengan Google."
          )
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(signFailure("Terjadi kesalahan saat masuk dengan Google."));
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" /> Continue with Google
    </Button>
  );
}

export default OAuth;
