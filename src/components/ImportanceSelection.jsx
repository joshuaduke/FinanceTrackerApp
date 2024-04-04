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
              fill="white"
              d="M1 21L12 2l11 19H1Zm11-3q.425 0 .713-.288T13 17q0-.425-.288-.712T12 16q-.425 0-.712.288T11 17q0 .425.288.713T12 18Zm-1-3h2v-5h-2v5Z"
            />
          </svg>
          <span className="ml-2 items-center text-text text-lg">
            Importance
          </span>
        </li>
      </ul>
      <div className="grid grid-cols-2 my-2 gap-2 md:grid-cols-4">
        <div className="border-2 border-solid border-white-100 p-2 bg-impGreen">
          <label
            htmlFor="essential"
            className="w-full flex flex-row justify-between"
          >
            Essential
            <input
              type="radio"
              name="importance"
              id="essential"
              value="Essential"
              className=""
              onChange={handleChange}
              checked={importance === "Essential"}
            />
          </label>
        </div>

        <div className="border-2 border-solid border-white-100 p-2 bg-impYellow">
          <label
            htmlFor="haveToHave"
            className="w-full flex flex-row justify-between"
          >
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

        <div className="border-2 border-solid border-white-100 p-2 bg-impOrange">
          <label
            htmlFor="needToHave"
            className="w-full flex flex-row justify-between"
          >
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

        <div className="border-2 border-solid border-white-100 p-2 bg-impRed">
          <label
            htmlFor="shouldNotHave"
            className="w-full flex flex-row justify-between"
          >
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
