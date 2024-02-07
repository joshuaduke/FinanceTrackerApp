import { myIcons } from "../assets/myIcons";
import CategoryIcon from "./CategoryIcon";

function CategorySelection(props) {
  let myIconsArr;
  console.log("Props", props);
  let value = props.categoryType;
  console.log("Category", props.category);
  console.log("Category Type", value);

  if (value == "expenses") {
    myIconsArr = myIcons.filter((icon) => {
      return icon.type == "expense";
    });
  } else if (value == "income") {
    myIconsArr = myIcons.filter((icon) => {
      return icon.type == "income";
    });
  }

  return (
    <div className="bg-green-100 px-4">
      <div id="category-selection" className="">
        <div>
          <h3>Transaction Category</h3>
          <div>
            <span>Icon 1</span>
            <span>Icon 2</span>
          </div>
        </div>

        <div className="grid grid-cols-3 rounded-xl bg-gray-200 p-2">
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
              value={props.categoryType === "expenses"}
              onChange={() => props.selectCategoryType("expenses")}
              checked={props.categoryType === "expenses"}
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
              value={props.categoryType === "income"}
              onChange={() => props.selectCategoryType("income")}
              checked={props.categoryType === "income"}
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
              value={props.categoryType === "Transfer"}
              onChange={() => props.selectCategoryType("Transfer")}
              checked={props.categoryType === "Transfer"}
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
                onChange={() => props.setCategory(icon.name)}
                checked={props.category === icon.name}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySelection;
