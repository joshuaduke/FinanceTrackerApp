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
        const docRef = addDoc(collection(db, "users"), {
          ...userData,
          userId: user.user.uid,
        });

        navigate("/");
      });
    } catch (error) {
      console.error("Error in Handle Signup", error);
    }
  };

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <nav className="w-full text-text border-b-2 p-6">
        <h1>J-SPENDER</h1>
      </nav>
      <div className="text-text md:grid md:grid-cols-2 px-8 lg:px-24 xl:px-44">
        <section
          className="bg-blue-300 rounded-l-3xl px-8 py-16 hidden md:block"
          id="information"
        >
          <div>
            <h1>Welcome to J-Spender</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel omnis
              dicta repellat, commodi in error aliquid autem. Ratione, impedit!
              Cum.
            </p>
          </div>
          <div></div>
        </section>

        <section id="signUp" className="md:px-6 md:pl-12">
          <div className="my-12">
            <h1 className="text-2xl">Hello!</h1>
            <p className="text-sm">Create an Account</p>
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
                Sign Up
              </button>

              <p>
                Already have an account?{" "}
                <Link to="/signIn">
                  <span className="text-impOrange text-sm">Sign in</span>
                </Link>
              </p>

              <button
                className="py-2 px-4 bg-secondary w-full mx-auto my-4 rounded-md shadow-sm shadow-white"
                onClick={(e) => {
                  handleSignUp(e);
                }}
              >
                Sign Up with Google
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
