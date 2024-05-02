import { myIcons } from "../assets/myIcons";
import CategoryIcon from "./CategoryIcon";

function CategorySelection({
  categoryType,
  setCategory,
  selectCategoryType,
  category,
}) {
  let myIconsArr;

  let value = categoryType;
  console.log("Category", category);
  console.log("Category Type", value);

  if (value === "expenses") {
    myIconsArr = myIcons.filter((icon) => {
      return icon.type == "expense";
    });
  } else if (value === "income") {
    myIconsArr = myIcons.filter((icon) => {
      return icon.type == "income";
    });
  } else {
    alert("error in category selection");
  }

  return (
    <div className="bg-secondary text-text px-2">
      <h2 className="py-2">Transaction Category</h2>

      <div id="category-selection" className="">
        <div className="grid grid-cols-3 rounded-xl bg-bgPrimary p-2">
          <div>
            <label
              htmlFor="expenses"
              className=" cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >
              Expenses
            </label>
            <input
              className="peer "
              type="radio"
              name="categoryType"
              id="expenses"
              value="expenses"
              onChange={selectCategoryType}
              checked={categoryType === "expenses"}
            />
          </div>
          <div>
            <label
              htmlFor="expenses"
              className=" cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >
              Income
            </label>
            <input
              className="peer "
              type="radio"
              name="categoryType"
              id="income"
              value="income"
              onChange={selectCategoryType}
              checked={categoryType === "income"}
            />
          </div>
          <div>
            <label
              htmlFor="expenses"
              className=" cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >
              Transfer
            </label>
            <input
              className="peer "
              type="radio"
              name="categoryType"
              id="transfer"
              value="Transfer"
              onChange={selectCategoryType}
              checked={categoryType === "Transfer"}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 text-center">
        {myIconsArr?.map((icon) => (
          <div key={icon.id} className="flex-1">
            <label className="cursor-pointer" htmlFor="category">
              <CategoryIcon className="" category={icon.name} />
              <span className="text-xs">{icon.name.slice(0, 13)}</span>
              <input
                className=""
                type="radio"
                name="category"
                id="category"
                value={icon.name}
                onChange={setCategory}
                checked={category === icon.name}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelection;
