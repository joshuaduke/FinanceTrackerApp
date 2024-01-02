import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { makeServer } from "./server.js";
import "./index.css";

// makeServer({ environment: "development" })

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
