import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { User } from '../models/user';
import { ProductItem } from '../components/ProductItem';
import styles from '../styles/MainPage.module.css';

interface MainPageProps {
  loggedInUser: User | null;
  products: ProductItem[];
}

const MainPage: React.FC<MainPageProps> = ({ loggedInUser, products }) => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/products');
        const productsData: ProductItem[] = response.data;
        const uniqueCategories = Array.from(new Set(productsData.map((product) => product.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  const fetchProductsByCategory = async (category: string) => {
    try {
      const response = await axios.get(`/api/products?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for ${category}:`, error);
      return [];
    }
  };

  const [productsByCategory, setProductsByCategory] = useState<{ [key: string]: ProductItem[] }>({});

  useEffect(() => {
    const fetchData = async () => {
      const productsData: { [key: string]: ProductItem[] } = {};
      try {
        for (const category of categories) {
          const response = await axios.get(`/api/products?category=${category}`);
          productsData[category] = response.data.filter((product: { category: string; }) => product.category === category);
        }
        setProductsByCategory(productsData);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    if (categories.length > 0) {
      fetchData();
    }
  }, [categories]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Access form data and perform actions (e.g., send email)
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const message = formData.get('message');
    console.log('Form Data:', { firstName, lastName, email, message });
    // Add logic to handle the form submission (e.g., send data to backend)
  };
  return (
    <div>
      <h2 className="text-center my-4">Featured Events</h2>
      {/* Display featured products */}
      <div className={`row ${styles.productRow}`}>
        {featuredProducts.length === 0 ? (
          <p>No featured products available.</p>
        ) : (
          featuredProducts.map((product) => (
            <div key={product._id} className={`col-md-2 ${styles.productItem}`}>
              <Link to={`/product/${product._id}`} className={styles.productLink}>
                <img src={product.imageSrc} alt={product.name} className="img-fluid" />
                <div className={styles.productName}>{product.name}</div>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Display products for each category */}
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        <div key={category}>
          <h2>{category}</h2>
          <div className={`row ${styles.productRow}`}>
            {categoryProducts.map((product) => (
              <div key={product._id} className={`col-md-2 ${styles.productItem}`}>
                <Link to={`/product/${product._id}`} className={styles.productLink}>
                  <img src={product.imageSrc} alt={product.name} className="img-fluid" />
                  <div className={styles.productName}>{product.name}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    
    
  );
};

export default MainPage;
