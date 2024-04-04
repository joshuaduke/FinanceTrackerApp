function RecurrenceSelection({ recurrence, handleChange }) {
  return (
    <>
      <div id="recurrence-selection" className="flex justify-between my-4">
        <ul>
          <li className="flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill=""
                d="m7 22l-4-4l4-4l1.4 1.45L6.85 17H17v-4h2v6H6.85l1.55 1.55zM5 11V5h12.15L15.6 3.45L17 2l4 4l-4 4l-1.4-1.45L17.15 7H7v4z"
              />
            </svg>
            <span className="ml-2 text-lg text-text">Recurrence</span>
          </li>
        </ul>
        <div>
          <select
            className="block w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            name="recurrence"
            id="recurrence"
            value={recurrence}
            onChange={handleChange}
          >
            <option value="">--- Select One ---</option>
            <option value="never">Never</option>
            <option value="monthly">monthly</option>
            <option value="biweekly">biweekly</option>
            <option value="yearly">yearly</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default RecurrenceSelection;
