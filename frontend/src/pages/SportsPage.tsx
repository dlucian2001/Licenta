import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ProductItem } from '../components/ProductItem';

const SportsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductItem[]>('/api/products?category=Sports');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => product.category === 'Sports');

  return (
    <div>
      <h2>Sports</h2>
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

export default SportsPage;
