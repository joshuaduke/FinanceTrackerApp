import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../Config/firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Context } from "../../Context/AuthContext";

function Settings() {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const logout = async () => {
    try {
      await signOut(auth).then(() => {
        navigate("/signIn");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>{user.email}</h1>
      <div className="text-red-500">
        <ul>
          <li>
            <button onClick={() => navigate(-1)}>Back</button>
          </li>
        </ul>
      </div>
      <form action="" className="text-red-500">
        <label htmlFor="">First Name</label>
        <input type="text" />

        <label htmlFor="">Last Name</label>
        <input type="text" />

        <label htmlFor="">Email</label>
        <input type="email" />
      </form>
      <button onClick={logout} className="text-red-500">
        Log Out
      </button>
      <Footer />
    </>
  );
}

export default Settings;

// if provider is google then use .photoUrl variable to retrieve the google image
