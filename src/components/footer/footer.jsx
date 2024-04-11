import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";

export default function Footer() {
  // const currentRoute = useLocation();
  // console.log("Current Route", currentRoute);

  return (
    <div
      className="
    py-4 px-1 grid grid-cols-4 justify-center rounded-t-xl bg-secondary w-full fixed bottom-0 left-0 right-0  
    lg:absolute lg:flex lg:top-14 lg:bottom-auto lg:left-64 lg:justify-start lg:bg-transparent lg:w-fit
    2xl:left-96 2xl:ml-44 2xl:text-lg"
    >
      <Link className="flex flex-col text-text mx-2 lg:mx-4" to="/home">
        <svg
          className="place-self-center lg:hidden"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M15 4H6v16h12V7h-3V4ZM6 2h10l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 9h8v2H8v-2Zm0 4h8v2H8v-2Z"
          />
        </svg>
        <p className="text-center pt-2">Timeline</p>
      </Link>
      <Link className="flex flex-col text-text mx-2 lg:mx-4" to="/wallet">
        <svg
          className="place-self-center lg:hidden"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6 20q-1.65 0-2.825-1.175T2 16V8q0-1.65 1.175-2.825T6 4h12q1.65 0 2.825 1.175T22 8v8q0 1.65-1.175 2.825T18 20H6ZM6 8h12q.55 0 1.05.125t.95.4V8q0-.825-.587-1.412T18 6H6q-.825 0-1.412.588T4 8v.525q.45-.275.95-.4T6 8Zm-1.85 3.25l11.125 2.7q.225.05.45 0t.425-.2l3.475-2.9q-.275-.375-.7-.612T18 10H6q-.65 0-1.137.338t-.713.912Z"
          />
        </svg>
        <p className="text-center pt-2">Wallet</p>
      </Link>
      <Link className="flex flex-col text-text mx-2 lg:mx-4" to="/goals">
        <svg
          className="place-self-center lg:hidden"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M14 4h-4C6.229 4 4.343 4 3.172 5.172c-.844.843-1.08 2.057-1.146 4.078h19.948c-.066-2.021-.302-3.235-1.146-4.078C19.657 4 17.771 4 14 4Z"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M14 20h-4c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12c0-.442 0-.858.002-1.25h19.996c.002.392.002.808.002 1.25c0 3.771 0 5.657-1.172 6.828C19.657 20 17.771 20 14 20Zm2.045-7.75c.433 0 .83 0 1.152.043c.356.048.731.16 1.04.47c.31.309.422.684.47 1.04c.043.323.043.72.043 1.152v.09c0 .433 0 .83-.043 1.152c-.048.356-.16.731-.47 1.04c-.309.31-.684.422-1.04.47c-.323.043-.72.043-1.152.043h-.09c-.433 0-.83 0-1.152-.043c-.356-.048-.731-.16-1.04-.47c-.31-.309-.422-.684-.47-1.04c-.043-.323-.043-.72-.043-1.152v-.09c0-.433 0-.83.043-1.152c.048-.356.16-.731.47-1.04c.309-.31.684-.422 1.04-.47c.323-.043.72-.043 1.152-.043h.09ZM5.25 13.5a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75Zm0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
          <path
            fill="currentColor"
            d="m14.823 13.823l.003-.001a.702.702 0 0 1 .177-.042c.21-.028.504-.03.997-.03s.787.002.997.03a.702.702 0 0 1 .177.042l.003.001l.001.003a.702.702 0 0 1 .042.177c.028.21.03.504.03.997s-.002.787-.03.997a.702.702 0 0 1-.042.177l-.001.003l-.003.001a.702.702 0 0 1-.177.042c-.21.028-.504.03-.997.03s-.787-.002-.997-.03a.702.702 0 0 1-.177-.042l-.003-.001l-.001-.003a.702.702 0 0 1-.042-.177c-.028-.21-.03-.504-.03-.997s.002-.787.03-.997a.702.702 0 0 1 .042-.177l.001-.003Z"
          />
        </svg>
        <p className="text-center pt-2">Goals</p>
      </Link>
      <Link className="flex flex-col text-text mx-2 lg:mx-4" to="/settings">
        <svg
          className="place-self-center lg:hidden"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"
          />
        </svg>
        <p className="text-center pt-2">Settings</p>
      </Link>
    </div>
  );
}
