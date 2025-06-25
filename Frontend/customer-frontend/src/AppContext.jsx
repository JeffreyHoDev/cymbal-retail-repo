import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AppContext = createContext();

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}


export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch data or perform any setup when the component mounts
    const fetchData = async () => {
      try {
        // const response = await fetch(`${process.env.REACT_APP_PUBLIC_WEB_SERVICE_URL}/getProducts`);
          const url = `/getProducts`;
          const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.items); // Update the products in context
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const randomProducts = useMemo(() => {
    return products
      ? shuffle(Object.values(products).flat()).slice(0, 8)
      : [];
  }, [products]);

  const AISearch = async (query) => {
    try {
      const response = await fetch(`/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data); // Update search results in context
    } catch (error) {
      console.error('Error during AI search:', error);
    }
  }

  return (
    <AppContext.Provider value={{ categories, setCategories, products, setProducts, searchQuery, setSearchQuery, AISearch, randomProducts, searchResults, setSearchResults }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);