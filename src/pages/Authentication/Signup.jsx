import { useState } from "react";
import { auth, googleProvider, db } from "../../Config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      ).then((user) => {
        console.log("user", user);
        console.log("user", user.user.uid);
        const docRef = addDoc(collection(db, "users"), {
          ...userData,
          userId: user.user.uid,
        });

        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  return (
    <div className="text-text px-6 py-12 h-screen">
      <div className="my-12">
        <h1 className="text-lg">Hello!</h1>
        <p className="text-sm">Create an Account</p>
      </div>

      <div className="w-full h-1/4 grid">
        <h2 className="place-self-center text-xl">J-Spender</h2>
      </div>

      <form action="">
        <label htmlFor="firstName" className="text-text text-md">
          First Name
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="firstName"
          id="firstName"
          className="w-full h-10 px-2 mb-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
        />
        <label htmlFor="lastName" className="text-text text-md">
          Last Name
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="lastName"
          id="lastName"
          className="w-full h-10 px-2 mb-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
        />
        <label htmlFor="email" className="text-text text-md">
          Email
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
          className="w-full h-10 px-2 mb-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
        />
        <label htmlFor="password" className="text-text text-md">
          Password
        </label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          className="w-full h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
        />
        <div></div>

        <div className="mt-6">
          <button
            className="py-2 px-4 bg-secondary w-full mx-auto my-4 rounded-md shadow-sm shadow-white"
            onClick={(e) => {
              handleSignUp(e);
            }}
          >
            Submit
          </button>

          <p>
            Already have an account?{" "}
            <Link to="/signIn">
              <span className="text-impOrange text-sm">Sign in</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}