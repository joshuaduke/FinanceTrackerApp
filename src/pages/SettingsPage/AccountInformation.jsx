import { signOut } from "firebase/auth";
import { auth } from "../../Config/firebase";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../../Context/AuthContext";
import { useState } from "react";
import Footer from "../../components/footer/footer";

export function AccountInformation() {
  const navigate = useNavigate();
  const { user, userData } = useContext(Context);
  console.log("Context User Data", userData);
  const [fbUserData, setFbUserData] = useState(userData);

  //   useEffect(() => {
  //     // setFbUserData({
  //     //   ...fbUserData,
  //     //   email: userData?.email != undefined ? userData.email : "",
  //     //   firstName: userData?.firstName != undefined ? userData.firstName : "",
  //     //   lastName: userData?.lastName != undefined ? userData.lastName : "",
  //     // });
  //     setFbUserData({ ...fbUserData, userData });
  //   }, []);

  console.log("Account user data,", fbUserData);

  const deleteAccount = async () => {
    // add confirmation message
    try {
      let confirmText = "Are you sure you want to delete your account?";

      if (confirm(confirmText) == true) {
        await signOut(auth).then(() => {
          navigate("/signIn");
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleChange(e) {
    setFbUserData({ ...fbUserData, [e.target.name]: e.target.value });
  }
  return (
    <div className="text-text px-6 py-12 h-screen ">
      <div className=" text-text mb-12 border-test">
        <ul className="grid grid-cols-4 ">
          <li className="col-span-1 ">
            <p onClick={() => navigate(-1)}>Back</p>
          </li>
          <li className="col-span-2 text-center">Account Information</li>
          <li className="col-span-1"></li>
        </ul>
      </div>

      <form action="" className="border-test">
        <label htmlFor="firstName" className="text-text text-md">
          First Name
        </label>
        <input
          value={fbUserData?.firstName}
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
          value={fbUserData?.lastName}
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
          value={fbUserData?.email}
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
          className="w-full h-10 px-2 mb-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
        />
        <div></div>

        <div className="mt-6">
          <button
            onClick={deleteAccount}
            className="text-secondary w-full bg-impRed my-6 py-2 px-6 rounded-md border-2 border-secondary"
          >
            Delete
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
