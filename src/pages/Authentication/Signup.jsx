import { useState } from "react";
import { auth, googleProvider } from "../../Config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (user) => {
          console.log("user", user);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-red-500">
      <h1>This is the sign up page</h1>
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
            handleSignUp(e);
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
