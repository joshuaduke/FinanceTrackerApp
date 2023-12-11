function Importance() {
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
          <input type="radio" name="" id="" />
          <label htmlFor="">Essential</label>
        </div>

        <div>
          <input type="radio" name="" id="" />
          <label htmlFor="">Have To Have</label>
        </div>

        <div>
          <input type="radio" name="" id="" />
          <label htmlFor="">Nice To Have</label>
        </div>

        <div>
          <input type="radio" name="" id="" />
          <label htmlFor="">Shouldn&apos;t Have</label>
        </div>
      </div>
    </div>
  );
}

export default Importance;
