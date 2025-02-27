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
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);
  const errorInputStyling = {
    errorMsg: {
      border: displayErrorMsg ? "2px solid red" : "none",
    },
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then((user) => {
        console.log("user", user);
        navigate("/");
      });
    } catch (error) {
      setDisplayErrorMsg(true);
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen place-content-center">
      {/* only visible in mobile view */}
      <nav className="w-full border-b-2 p-6 md:hidden">
        <h1 className="text-white">J-SPENDER</h1>
      </nav>

      <div className="px-8 md:py-4 md:flex md:flex-row lg:px-24 xl:px-44 ">
        <section className="text-white self-center md:px-24 md:pl-12 ">
          <div className="my-16">
            <h1 className="text-2xl">Welcome Back</h1>
            <p className="text-sm">Log In! </p>
          </div>

          <form action="">
            <label htmlFor="" className=" text-md">
              Email
            </label>

            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
              required
              className="w-full h-10 px-4 mb-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
              style={errorInputStyling.errorMsg}
            />

            <label htmlFor="" className="text-md">
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              required
              name="password"
              id="password"
              className="w-full h-10 px-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
              style={errorInputStyling.errorMsg}
            />
            <div>
              <p className="w-full text-right text-impOrange text-sm">
                Forgot Password?
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center ">
              <button
                className="py-2 px-10  w-full mx-auto my-4 rounded-lg shadow-md bg-primaryBlue text-text"
                onClick={(e) => {
                  handleSignIn(e);
                }}
              >
                Log In
              </button>

              {/* <button
                className="py-2 px-4 bg-secondary w-full mx-auto my-4 rounded-md shadow-sm shadow-white"
                onClick={(e) => {
                  handleSignIn(e);
                }}
              >
                Sign In with Google
              </button> */}

              {/* Sign In with Google - Phase 2 */}
              <button>
                <svg
                  className="bg-white rounded-xl p-1 my-4"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#e53935"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4caf50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1565c0"
                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
              </button>

              {displayErrorMsg && (
                <div className="text-sm text-center text-red-500">
                  <p>Sorry either your email or password was incorrect </p>
                  <p>Please double-check your credentials</p>
                </div>
              )}
              <p className="w-full text-right">
                Don&apos;t have an account?{" "}
                <Link to="/signUp">
                  <span className=" text-impOrange">Sign Up</span>
                </Link>
              </p>
            </div>
          </form>
        </section>

        <section
          className="h-fit bg-blue-300 rounded-l-3xl px-10 py-8 hidden md:block md:self-center"
          id="information"
        >
          <div>
            <h1 className="text-2xl">J-Spender</h1>
            <h2 className="text-lg">Welcome to J-Spender</h2>
          </div>
          <div className="flex flex-col justify-center">
            <div className="my-4">
              <span className="block text-lg text-complement1">
                Get a quick Overview
              </span>
              <p>
                about your total incomes and expenses at a glance and in one
                place. Add your expenses manually and keep track of your monthly
                expenses!
              </p>
            </div>

            <div className="">
              <span className="block text-lg text-complement1">
                Set up Budgets and Savings goals
              </span>
              {/* <p className="font-bold">
                Use our smart budgets and smart savings to save money for a new
                car, dreamy vacation, education or a house.
              </p> */}

              <ul className="mt-2 flex flex-col gap-2 list-disc">
                <li>
                  Set smart budgets to help you not to overspend in chosen
                  category.
                </li>
                <li>Set smart savings to help save for your future dreams.</li>
                <li>
                  Know how much you can spend daily in order to stick to your
                  budget.
                </li>
              </ul>
            </div>

            <div className="my-4">
              <span className="block text-lg text-complement1">
                Compare Monthly expenses
              </span>
              <p className="font-bold">Understand your financial habits</p>
              <ul className="mt-2 flex flex-col gap-2 list-disc">
                <li>
                  Analyze your finance with beautiful, simple and easy to
                  understand graphic. No need for complicated Excel sheets.
                </li>
                <li>
                  See where your money goes and where they come from every
                  month.
                </li>
                <li>
                  See whether you spend less than you earn in one place and on 1
                  tap.
                </li>
              </ul>
            </div>
          </div>
          <div></div>
        </section>
      </div>
    </div>
  );
}
