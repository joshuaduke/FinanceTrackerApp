import { useNavigate } from "react-router-dom";

function Overview() {
  const navigate = useNavigate();
  return (
    <>
      <h1>This page is under construction - beat it!</h1>
      <p>Feature coming soon</p>
      <button onClick={() => navigate(-1)}>Back Home</button>
    </>
  );
}

export default Overview;
