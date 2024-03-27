export default function Period({ period, setPeriod }) {
  return (
    <select
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
