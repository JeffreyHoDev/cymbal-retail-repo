import './App.css';
import { AppProvider } from './AppContext';
import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from './home/home.page';
import CategoryPage from './specific_category_page/category.page';
import Header from './components/header/header.component';
import SearchResultsPage from './searchresultspage/searchresults.page';
import ProductDetailPage from './product-detail/productdetail.page';
import Chatbot from './components/chatbot/chatbot.component';

// https://reactrouter.com/start/declarative/navigating
function App() {
  return (
  <AppProvider>
  <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/category/:category/product/:productID" element={<ProductDetailPage />} />
        <Route path="/searchResultsPage" element={<SearchResultsPage />} />
      </Routes>
      <Chatbot />
    </div>
  </BrowserRouter>
  </AppProvider>
  );
}

export default App;
