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
    <div className="flex h-screen place-content-center">
      {/* only visible in mobile view */}
      <nav className="w-full border-b-2 p-6 md:hidden">
        <h1 className="text-white">J-SPENDER</h1>
      </nav>

      <div className="px-8 md:py-4 md:flex md:flex-row lg:px-24 xl:px-44 ">
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

        <section
          id="signUp"
          className="text-white md:px-6 md:pl-12 md:self-center"
        >
          <div className="my-12">
            <h1 className="text-2xl">Hello!</h1>
            <p className="text-sm">Create an Account</p>
          </div>

          <form action="">
            <label htmlFor="firstName" className="text-md">
              First Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="firstName"
              id="firstName"
              className="w-full h-10 px-2 mb-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
            />
            <label htmlFor="lastName" className="text-md">
              Last Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="lastName"
              id="lastName"
              className="w-full h-10 px-2 mb-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
            />
            <label htmlFor="email" className="text-md">
              Email
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="email"
              id="email"
              className="w-full h-10 px-2 mb-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
            />
            <label htmlFor="password" className="text-md">
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

            <div className="mt-6 flex flex-col items-center justify-center ">
              <button
                className="py-2 px-10 w-full bg-primaryBlue text-text mx-auto my-4 rounded-md shadow-sm shadow-primaryBlue"
                onClick={(e) => {
                  handleSignUp(e);
                }}
              >
                Sign Up
              </button>

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

              <p className="w-full text-right">
                Already have an account?{" "}
                <Link to="/signIn">
                  <span className="text-impOrange text-sm">Sign in</span>
                </Link>
              </p>

              {/* <button
                className="py-2 px-4 bg-secondary w-full mx-auto my-4 rounded-md shadow-sm shadow-white"
                onClick={(e) => {
                  handleSignUp(e);
                }}
              >
                Sign Up with Google
              </button> */}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
