// ForChildrenPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ProductItem } from '../components/ProductItem';

const ForChildrenPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductItem[]>('/api/products?category=For%20Children');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the category
  const filteredProducts = products.filter(product => product.category === 'For Kids');

  return (
    <div>
      <h2>For Children</h2>
      {filteredProducts.map((product) => (
        <div key={product._id}>
          <Link to={`/product/${product._id}`}>
            <h3>{product.name}</h3>
            <img src={product.imageSrc} alt={product.name} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ForChildrenPage;
