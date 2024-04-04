import { useState } from "react";
import { auth, googleProvider } from "../../Config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="text-text px-6 py-12 h-screen">
      <div className="my-12">
        <h1 className="text-lg">Welcome!</h1>
        <p className="text-sm">Login to continue</p>
      </div>

      <div className="w-full h-1/4 grid">
        <h2 className="place-self-center text-xl">J-Spender</h2>
      </div>

      <form action="">
        <label htmlFor="" className="text-text text-md">
          Email
        </label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          name=""
          id=""
          className="w-full h-10 px-2 mb-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
        />
        <label htmlFor="" className="text-text text-md">
          Password
        </label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name=""
          id=""
          className="w-full h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
        />
        <div>
          <span className="text-impOrange text-sm">Forgot Password?</span>
        </div>

        <div className="mt-6">
          <button
            className="py-2 px-4 bg-secondary w-full mx-auto my-4 rounded-md shadow-sm shadow-white"
            onClick={(e) => {
              handleSignIn(e);
            }}
          >
            Sign In
          </button>
          <Link to="/signUp">
            <div className="py-2 px-4 bg-complement2 w-full mx-auto my-4 text-center rounded-md shadow-sm shadow-blue-500/50 text-blue-500">
              Create Account
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}
