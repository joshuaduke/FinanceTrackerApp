import { useState } from "react";
import CategoryIcon from "./CategoryIcon";

function CategoryCheckbox({
  isChecked,
  name,
  type,
  checkHandler,
  setBudgetCategories,
  budgetCategories,
}) {
  function handleCheck(e) {
    checkHandler();

    if (budgetCategories.indexOf(name) == -1) {
      setBudgetCategories([...budgetCategories, e.target.value]);
    } else {
      console.log("index", budgetCategories.indexOf(name));
      const startIndex = budgetCategories.indexOf(name);
      budgetCategories.splice(startIndex, 1);
      setBudgetCategories(budgetCategories);
    }
  }
  return (
    <>
      {type != "transfer" && (
        <div className="p-2 flex border-b-2 border-bgPrimary">
          <CategoryIcon category={name} />
          <label htmlFor="category" className="self-center ml-4 mr-2">
            {name}
          </label>
          <input
            type="checkbox"
            name="category"
            id="category"
            checked={budgetCategories.indexOf(name) == -1 ? false : true}
            value={name}
            onChange={(e) => handleCheck(e)}
            required
          />
        </div>
      )}
    </>
  );
}

export default CategoryCheckbox;
