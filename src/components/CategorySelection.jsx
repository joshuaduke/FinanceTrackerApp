import { myIcons } from "../assets/myIcons";
import CategoryIcon from "./CategoryIcon";

function CategorySelection(props) {
  let myIconsArr;
  console.log("Props", props);
  let value = props.categoryType;

  if (value == "expenses") {
    myIconsArr = myIcons.filter((icon) => {
      return icon.type == "expense";
    });
  } else if (value == "income") {
    myIconsArr = myIcons.filter((icon) => {
      return icon.type == "income";
    });
  } else {
    myIconsArr = myIcons;
  }
  return (
    <>
      <div className="grid grid-cols-4 text-center">
        {myIconsArr.map((icon) => (
          <div key={icon.id} className="flex-1">
            <label htmlFor="category">
              <CategoryIcon className="" category={icon.name} />
              <span>{icon.name.slice(0, 13)}</span>
            </label>
            <input
              className=""
              type="radio"
              name="category"
              id="category"
              value={icon.name}
              onChange={() => props.setCategory(icon.name)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default CategorySelection;
