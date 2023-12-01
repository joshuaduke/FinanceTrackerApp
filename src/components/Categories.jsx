import { myIcons } from "../assets/myIcons";
import CategoryIcon from "./CategoryIcon";

function Categories(){
    console.log('Icons', myIcons)
const myIconsArr = myIcons;
    return(
        <>
            <h2>Categories Page</h2>
            {myIconsArr.map((icon)=>
                <CategoryIcon key={icon.id} category={icon.name} />
            )}
        </>
    )
}


export default Categories;