
import CategoryComponent from '../components/category/category.component';
import ProductsForYou from '../components/product_for_you/products_for_you.component';
import Banner from '../components/banner/banner.component'
import Footer from '../components/footer/footer.component';
import './home.page.css'; // Assuming you have some styles for the home page
const HomePage = () => {
  // State to hold products or any other data if needed

  return (
    <div className="homepage">
      {/* <h1>Welcome to Cymbal Retail</h1>
      <p>Discover our latest products and offers!</p> */}
      <Banner />
      <CategoryComponent/>
      <ProductsForYou />
      <Footer />
    </div>
  );
}

export default HomePage;