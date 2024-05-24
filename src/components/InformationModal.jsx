import { Link } from "react-router-dom";

function InformationModal() {
  return (
    <>
      <div className="bg-secondary absolute top-0 left-0 right-0 bottom-0 z-10 opacity-70"></div>

      <div className="m-auto w-5/6 h-5/6 bg-complement2 absolute top-0 left-0 right-0 bottom-0 z-20 p-6">
        <ul>
          <li className="text-right">
            <Link to="/">Return</Link>
          </li>
        </ul>
        <p>
          Before you can add a new transaction you must first create a wallet.
        </p>
        <Link
          to="/wallet/new"
          className="py-2 px-4 bg-complement1 my-6 inline-block"
        >
          Create new Wallet
        </Link>
      </div>
    </>
  );
}

export default InformationModal;
