import { useParams } from "react-router-dom";

function BudgetDetails() {
  const params = useParams();
  const budgetId = params.id;

  return (
    <>
      <div>
        <ul>
          <li>Close</li>
          <li>Edit Budget</li>
          <li>Delete</li>
        </ul>
      </div>
      <div>
        <p>
          Budget has been exceeded by ___ but do not despair, it will get better
          next time
        </p>
        <p>
          Keep Spending. You can spend ____ each day for the rest of the period.
        </p>
      </div>

      <div>
        <h3>Previous Periods</h3>
      </div>
    </>
  );
}

export default BudgetDetails;
