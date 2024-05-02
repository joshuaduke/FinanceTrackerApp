import { useNavigate } from "react-router-dom";

function Overview() {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-text">
        <h1>This page is under construction</h1>
        <p>Feature coming soon</p>
        <button onClick={() => navigate(-1)}>Back Home</button>
      </div>
    </>
  );
}

export default Overview;
