import { myIcons } from "../assets/myIcons";
import CategoryIcon from "./CategoryIcon";

function Categories() {
  console.log("Icons", myIcons);
  const myIconsArr = myIcons;
  return (
    <div>
      {myIconsArr.map((icon) => (
        <CategoryIcon key={icon.id} category={icon.name} />
      ))}
    </div>
  );
}

export default Categories;
