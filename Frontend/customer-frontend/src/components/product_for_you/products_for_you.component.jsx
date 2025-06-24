import './products_for_you.styles.css';
import starIcon from '../../images/star.png'; // Assuming you have a star icon for ratings
import { NavLink } from 'react-router';
const { useAppContext } = require('../../AppContext');

const ProductsForYou = () => {
    const { randomProducts } = useAppContext();

    return (
        <div className="products-for-you">
        <h2>Products For You</h2>
        <p>Discover products tailored to your preferences.</p>
        {/* Add product cards or other components here */}
        <div className="product-list">
            {
                randomProducts.map((product, index) => (
                    <NavLink key={index} to={`/category/${product.category}/product/${product.id}`} className="product-link">
                        <div  className="product-card">
                            <img src={product.image_url[0]} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description.slice(0, 100)}...</p>
                            <div className="product-rating-row">
                                <img className="rating-image" src={starIcon} alt={product.rating} />
                                <span className="product-rating">{product.rating}</span>
                            </div>
                            <p className="product-price">${product.price}</p>
                        </div>
                    </NavLink>
                ))}
        </div>
        </div>
    );
}

export default ProductsForYou;