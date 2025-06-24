import { useParams } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { NavLink } from 'react-router-dom';

import './category.page.css'; // Assuming you have some styles for the category page

import starIcon from '../images/star.png';
const CategoryPage = () => {
  const { category } = useParams();
  const { products } = useAppContext();



  return (

        <div className='category-page'>
        <h1>{category}</h1>
        <div className='category-products'>
            {
                products[category] ? (
                    products[category].map((product, index) => {
                        return (
                        <div className="category-product-card" key={`${product.sku}-${index}`}>
                            <img
                                className="category-product-image"
                                src={product.image_url[0]}
                                alt={product.description}
                            />
                            <div className="category-product-content">
                                <h3 className="category-product-title">{product.name}</h3>
                                <p className="category-product-description">{product.description}</p>
                                <p className="category-product-price">${product.price}</p>
                                <div className="category-product-rating-row">
                                    <img className="rating-image" src={starIcon} alt={product.rating} />
                                    <span className="category-product-rating">{product.rating}</span>
                                </div>
                                <NavLink to={`/category/${category}/product/${product.id}`} className="category-product-button">Details</NavLink>
                            </div>
                        </div>
                        )
                    })
                ) : null
            }
        </div>
        </div>
  );
}

export default CategoryPage;