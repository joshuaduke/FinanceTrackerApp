import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <ul>
          <li>
            <button onClick={() => navigate(-1)}>Back</button>
          </li>
        </ul>
      </div>
      <form action="">
        <label htmlFor="">First Name</label>
        <input type="text" />

        <label htmlFor="">Last Name</label>
        <input type="text" />

        <label htmlFor="">Email</label>
        <input type="email" />
      </form>
      <Footer />
    </>
  );
}

export default Settings;
