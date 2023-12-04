import { myIcons } from "../assets/myIcons";



function CategoryIcon({category}){
    console.log('Category Prop', category);
    let componentCategory = getCategory(category);

    console.log("componentCategory", componentCategory);


    function getCategory(category){
        let categoryObj = myIcons.find(x => x.name === category);
        console.log('categoryObj', categoryObj.path);

        return categoryObj;
    }

    return (
        <div id="category-icon" style={{backgroundColor: componentCategory.backgroundColour}}>
            
            <svg xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24"
                // fill={componentCategory.backgroundColour}
                >
                    <path d={componentCategory.path} />
            </svg>
        </div>

    )
}

export default CategoryIcon;