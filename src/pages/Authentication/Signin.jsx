import { useState } from "react";
import { auth, googleProvider } from "../../Config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then((user) => {
        console.log("user", user);
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-red-500">
      <h1>This is the sign in page</h1>
      <form action="">
        <label htmlFor="">Email</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          name=""
          id=""
        />
        <label htmlFor="">Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name=""
          id=""
        />
        <br />
        <button
          onClick={(e) => {
            handleSignIn(e);
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
