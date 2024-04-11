import Footer from "../../components/footer/footer";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../../Config/firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Context } from "../../Context/AuthContext";
import { AccountInformation } from "./AccountInformation";

function Settings() {
  const navigate = useNavigate();

  const logout = async () => {
    // add confirmation message
    try {
      await signOut(auth).then(() => {
        navigate("/signIn");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="p-6">
      <div className="text-text mb-4">
        <ul>
          <li>
            <button onClick={() => navigate(-1)}>Back</button>
          </li>
        </ul>
      </div>

      <h1 className="text-text text-3xl my-6">Settings</h1>

      <ul className="text-text">
        <Link to="/accountInfo">
          <li className="flex justify-between border-b pb-1 my-6 ">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="place-self-center mr-4"
              >
                <path
                  fill="currentColor"
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                />
              </svg>
              <p>Account Information</p>
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
                />
              </svg>
            </div>
          </li>
        </Link>
        <Link to="appearance">
          <li className="flex justify-between border-b pb-1">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="place-self-center mr-4"
              >
                <path
                  fill="currentColor"
                  d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"
                />
              </svg>
              <p>Appearance</p>
            </div>

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
                />
              </svg>
            </div>
          </li>
        </Link>
      </ul>

      <button
        onClick={logout}
        className="text-secondary w-full bg-impRed my-6 py-2 px-6 rounded-md border-2 border-secondary"
      >
        Log out
      </button>

      <Footer />
    </main>
  );
}

export default Settings;

// if provider is google then use .photoUrl variable to retrieve the google image
