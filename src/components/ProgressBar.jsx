function ProgressBar({ percentage }) {
  console.log("Percentage", percentage);
  let progressBarColour = "";
  if (percentage > 75) {
    progressBarColour = "red";
  } else if (percentage > 50 && percentage < 75) {
    progressBarColour = "yellow";
  } else {
    progressBarColour = "#22C55E";
  }

  return (
    <div className=" bg-neutral-200 dark:bg-neutral-600 ">
      <div
        className="p-0.5 text-center text-xs font-medium leading-none text-primary-100"
        style={{ width: `${percentage}%`, backgroundColor: progressBarColour }}
      >
        <p>{percentage} %</p>
      </div>
    </div>
  );
}
export default ProgressBar;
