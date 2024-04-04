export default function Period({ period, setPeriod }) {
  return (
    <select
      className="w-fit text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
      name="periodSize"
      id="period-size"
      value={period}
      onChange={(e) => setPeriod(e)}
    >
      <option value="week">Week</option>
      <option value="month">Month</option>
      <option value="year">Year</option>
      <option value="all">All history</option>
    </select>
  );
}
