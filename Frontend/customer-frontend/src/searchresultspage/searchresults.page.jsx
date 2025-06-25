import { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import starIcon from '../images/star.png'; // Assuming you have a star icon for ratings
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from "react-router-dom";
import './searchresults.styles.css'; // Assuming you have some styles for the search results page

const SearchResultsPage = () => {
  const { searchResults, searchQuery, setSearchResults } = useAppContext();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        let fetchSearchResults = async () => {
            try {
                setLoading(true);
                // Assuming you have a function to fetch search results based on the query
                let response = await fetch(`/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: searchQuery }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSearchResults(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setLoading(false);
            }
        }
        fetchSearchResults();
    }, [searchQuery])

  return (
    <div className="search-results-page">
      <h1>Search Results (Powered by Vertex AI)</h1>
        <div className="product-list">
            {
                loading ? <CircularProgress /> 
                : searchResults.length > 0 ? (searchResults.map((product, index) => {
                    console.log("Product:", product);
                    return (
                        <div key={index} className="product-card">
                            <img src={product.image_url[0]} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description.slice(0, 100)}...</p>
                            <div className="product-rating-row">
                                <img className="rating-image" src={starIcon} alt={product.rating} />
                                <span className="product-rating">{product.rating}</span>
                            </div>
                            <p className="product-price">${product.price}</p>
                            <NavLink to={`/category/${product.category}/product/${product.product_id}`} className="nav-button">Details</NavLink>
                        </div>
                    );
                })) : (
                    <p></p>
                )
            }
        </div>
    </div>
  );
}

export default SearchResultsPage;