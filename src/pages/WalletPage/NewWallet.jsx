import { useNavigate } from "react-router-dom";

function NewWallet() {
  const navigate = useNavigate();

  return (
    <form className="p-2">
      <div className="mb-4">
        <ul className="flex justify-between">
          <li>
            <button onClick={() => navigate(-1)}>Back</button>
          </li>
        </ul>
      </div>

      <div>
        <div>
          <label htmlFor="">Name: </label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="">Bank: </label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="">Current Balance: $</label>
          <input type="text" name="" id="" />
        </div>

        <div>
          <label htmlFor="">Description</label>
          <textarea name="" id=""></textarea>
        </div>

        <button className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0">
          Create New Wallet
        </button>
      </div>
    </form>
  );
}

export default NewWallet;
