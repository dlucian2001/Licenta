import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ProductItem } from '../components/ProductItem';

const ConcertsFestivalsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductItem[]>('/api/products?category=Concerts%20%26%20Festivals');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the category
  const filteredProducts = products.filter(product => product.category === 'Concerts & Festivals');

  return (
    <div>
      <h2>Concerts & Festivals</h2>
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

export default ConcertsFestivalsPage;
