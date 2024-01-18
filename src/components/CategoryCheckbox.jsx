import { useState } from "react";
import CategoryIcon from "./CategoryIcon";

function CategoryCheckbox({
  isChecked,
  name,
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
      <CategoryIcon category={name} />
      <label htmlFor="category" className="self-center">
        {name}
      </label>
      <input
        type="checkbox"
        name="category"
        id="category"
        checked={budgetCategories.indexOf(name) == -1 ? false : true}
        value={name}
        onChange={(e) => handleCheck(e)}
      />
    </>
  );
}

export default CategoryCheckbox;
