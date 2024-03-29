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
    <>
      <div className=" bg-neutral-200 dark:bg-neutral-600 ">
        <div
          className="p-0.5 text-center text-xs font-medium leading-none text-primary-100"
          style={{
            width: `${percentage}%`,
            backgroundColor: progressBarColour,
          }}
        >
          <p>{Math.ceil(percentage)} %</p>
        </div>
      </div>
      {percentage > 100 ? (
        <p>
          Budget has been exceeded but do not despair, it will get better next
          time
        </p>
      ) : (
        <p>Good Job. You are on track to be withing you budget!</p>
      )}
    </>
  );
}
export default ProgressBar;
