import './productdetail.page.css';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const ProductDetailPage = () => {
    const { category, productID } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Here you would typically fetch the product details based on category and productID
        // For this dummy implementation, we are using a static product object
        fetch(`${process.env.REACT_APP_PUBLIC_WEB_SERVICE_URL}/getSpecificProduct/${category}/${productID}`)
            .then(response => response.json())
            .then(data => {
                // Handle the fetched product data
                setProduct(data.item);
            })
            .catch(error => {
                console.error("Error fetching product data:", error);
            });
    }, [category, productID]);
  return (
    <div className="product-detail-page">
        <NavLink to={`/category/${category}`}>
            <button
                className="product-detail-back"
            >
                ← Back to {category}
            </button>
        </NavLink>
      {
        !product ? <p>Loading product details...</p> : 
        (
            <div className="product-detail-card">
                <img
                className="product-detail-image"
                src={product.image_url[0]}
                alt={product.name}
                />
                <div className="product-detail-content">
                <h1 className="product-detail-title">{product.name}</h1>
                <span>Category: {product.category}</span>
                <p className="product-detail-description">{product.description}</p>
                <div className="product-detail-rating">
                    <span>⭐ {product.rating} by {product.rating_count} people</span>
                </div>
                <span>Viewed: {product.view_count} times</span>
                <p className="product-detail-price">${product.price}</p>
                <div className='product-detail-other-attributes'>
                    {
                        // Choose the attributes that haven't shown yet
                        Object.entries(product).filter(([key, value]) =>
                            !['id', 'name', 'description', 'image_url', 'category', 'rating', 'rating_count', 'view_count', 'price', 'sku', 'quantity', 'rating_sum', 'status'].includes(key)
                        ).map(([key, value]) => (
                            <div key={`product-${key}`} className="product-detail-attribute">
                                <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                            </div>
                        ))
                    }
                </div>
                <button
                    className="product-detail-addtocart"
                    onClick={() => alert('Added to cart! (dummy action)')}
                >
                    Add to Cart
                </button>
                </div>
            </div>
        )
      }
    </div>
  );
};

export default ProductDetailPage;