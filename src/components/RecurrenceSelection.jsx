function RecurrenceSelection(props) {
  return (
    <>
      <div id="recurrence-selection" className="flex justify-between">
        <ul>
          <li className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m7 22l-4-4l4-4l1.4 1.45L6.85 17H17v-4h2v6H6.85l1.55 1.55zM5 11V5h12.15L15.6 3.45L17 2l4 4l-4 4l-1.4-1.45L17.15 7H7v4z"
              />
            </svg>
            <span className="ml-5">Recurrence</span>
          </li>
        </ul>
        <div>
          <select
            name="recurrence"
            id="recurrence"
            value={props.recurrence}
            onChange={(e) => props.setRecurrence(e.target.value)}
          >
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
