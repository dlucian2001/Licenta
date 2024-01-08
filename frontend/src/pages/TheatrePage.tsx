// TheatrePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ProductItem } from '../components/ProductItem';

const TheatrePage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductItem[]>('/api/products?category=Theatre');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the category
  const filteredProducts = products.filter(product => product.category === 'Theatre');

  return (
    <div>
      <h2>Theatre</h2>
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

export default TheatrePage;
