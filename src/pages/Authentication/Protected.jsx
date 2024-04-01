import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/AuthContext";

export function Protected({ children }) {
  const { user } = useContext(Context);
  console.log("Protected User:", user);
  if (!user) {
    console.log("Protected - No User");
    return <Navigate to="/signIn" replace />;
  } else {
    console.log("Protected - User");
    return children;
  }
}
