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
    <div>
      <nav className="w-full text-text border-b-2 p-6">
        <h1>J-SPENDER</h1>
      </nav>
      <div className="text-text md:grid md:grid-cols-2 px-8 lg:px-24 xl:px-44">
        <section className="md:px-24 md:pl-12">
          <div className="my-12">
            <h1 className="text-2xl">Welcome!</h1>
            <p className="text-sm">Login to continue</p>
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
              placeholder="Enter your email"
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
              placeholder="Password"
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
              <button
                className="py-2 px-4 bg-secondary w-full mx-auto my-4 rounded-md shadow-sm shadow-white"
                onClick={(e) => {
                  handleSignIn(e);
                }}
              >
                Sign In with Google
              </button>
              <p>
                Don&apos;t have an account?{" "}
                <Link to="/signUp">
                  <span className=" text-impOrange">Sign Up</span>
                </Link>
              </p>
            </div>
          </form>
        </section>
        <section
          className="bg-blue-300 rounded-l-3xl px-8 py-16 hidden md:block"
          id="information"
        >
          <div>
            <h1>J-Spender</h1>
            <h1>Welcome to J-Spender</h1>
          </div>
          <div className="h-full  flex flex-col justify-center">
            <p className="my-10">
              <span className="block text-lg text-complement1">
                Track Cash Flow
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel omnis
              dicta repellat, commodi in error aliquid autem. Ratione, impedit!
              Cum.
            </p>

            <p className="my-10">
              <span className="block text-lg text-complement1">
                Set up Budgets and Savings goals
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel omnis
              dicta repellat, commodi in error aliquid autem. Ratione, impedit!
              Cum.
            </p>

            <p className="my-10">
              <span className="block text-lg text-complement1">
                Compare Monthly expenses
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel omnis
              dicta repellat, commodi in error aliquid autem. Ratione, impedit!
              Cum.
            </p>
          </div>
          <div></div>
        </section>
      </div>
    </div>
  );
}
