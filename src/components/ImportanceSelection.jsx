function ImportanceSelection({ importance, handleChange }) {
  return (
    <div id="importance-selection">
      <ul>
        <li className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M1 21L12 2l11 19H1Zm11-3q.425 0 .713-.288T13 17q0-.425-.288-.712T12 16q-.425 0-.712.288T11 17q0 .425.288.713T12 18Zm-1-3h2v-5h-2v5Z"
            />
          </svg>
          <span className="ml-5">Importance</span>
        </li>
      </ul>
      <div className="grid grid-cols-2">
        <div>
          <label htmlFor="">
            Essential
            <input
              type="radio"
              name="importance"
              id="essential"
              value="Essential"
              onChange={handleChange}
              checked={importance === "Essential"}
            />
          </label>
        </div>

        <div>
          <label htmlFor="haveToHave">
            Have To Have
            <input
              type="radio"
              name="importance"
              id="haveToHave"
              value="Have To Have"
              onChange={handleChange}
              checked={importance === "Have To Have"}
            />
          </label>
        </div>

        <div>
          <label htmlFor="needToHave">
            Nice To Have
            <input
              type="radio"
              name="importance"
              id="needToHave"
              value="Need To Have"
              onChange={handleChange}
              checked={importance === "Need To Have"}
            />
          </label>
        </div>

        <div>
          <label htmlFor="shouldNotHave">
            Shouldn&apos;t Have
            <input
              type="radio"
              name="importance"
              id="shouldNotHave"
              value="Shouldn't Have"
              onChange={handleChange}
              checked={importance === "Shouldn't Have"}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default ImportanceSelection;
