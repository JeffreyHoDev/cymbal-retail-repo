import { useAppContext } from "../../AppContext";
import "./category.component.css"; // Assuming you have some styles for the category component
import { NavLink } from "react-router";

import apparelIcon from '../../images/apparel-icon.png';
import electronicsIcon from '../../images/electronics-icon.png';
import lifestyleIcon from '../../images/lifestyle-icon.png';
import accessoriesIcon from '../../images/accessories-icon.png';
import drinkwareIcon from '../../images/drinkware-icon.png';
import bagIcon from '../../images/icons8-bag-50.png';
import shoesIcon from '../../images/icons8-shoes-50.png';
import officeIcon from '../../images/office-icon.png';
import sofaIcon from '../../images/sofa-icon.png';
// import defaultIcon from '../../images/default-icon.png';

const matchCategoryToImage = (category) => {
  let object = {
    "Apparel": apparelIcon,
    "Electronics": electronicsIcon,
    "Lifestyle": lifestyleIcon,
    "Accessories": accessoriesIcon,
    "Drinkware": drinkwareIcon,
    "Shoes": shoesIcon,
    "Bags": bagIcon,
    "Office": officeIcon,
    "Sofa": sofaIcon,
  }
  return object[category]  // Fallback to a default image if category not found
}


const CategoryComponent = () => {
  const { products } = useAppContext();

  return (
    <div className="category-component">
      <h1>Category</h1>
      {
        products ? 
        <div className="category-list">
        {
              Object.entries(products).map(([category, items], index) => {
                return (
                  <NavLink to={`/category/${category}`} key={`${category}-${index}`}>
                    <div className="category-card" key={`navigation-${category}-${index}`}>
                      <img
                        src={matchCategoryToImage(category)}
                        alt={`product under category: ${category}`}
                        className="category-card__image"
                      />
                      <div className="category-card__content">
                        <h3 className="category-card__title">{category}</h3>
                      </div>
                    </div>                      
                  </NavLink>
                )
              })}
        </div>
         : null
      }
    </div>
  );
}

export default CategoryComponent;
