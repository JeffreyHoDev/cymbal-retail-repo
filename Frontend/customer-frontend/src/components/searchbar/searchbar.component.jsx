import './searchbar.styles.css';
import { useAppContext } from '../../AppContext';

import { useNavigate } from "react-router";
import { useState } from 'react';

const SearchBar = () => {
    const { setSearchQuery } = useAppContext();
    const [searchInput, setSearchInput] = useState('');
    let navigate = useNavigate();

    const handleSearch = async () => {
        if (searchInput.trim() !== '') {
            setSearchQuery(searchInput);
            navigate('/searchResultsPage');
        } else {
            alert('Please enter a search query.');
        }
    }
    return (
        <div className="search-bar">
            <input type="text" onChange={(e) => setSearchInput(e.target.value)} placeholder="Tell us what you looking for? (Powered by AI)" />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;