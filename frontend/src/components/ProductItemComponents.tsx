import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ProductItem } from './ProductItem'; // Import the Product interface

interface ProductItemComponentProps {
  productId: string;
}

const ProductItemComponent: React.FC<ProductItemComponentProps> = ({ productId }) => {
  const [fetchedProduct, setFetchedProduct] = useState<ProductItem | null>(null);
  const { productId: paramProductId } = useParams<{ productId: string }>();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get<ProductItem>(`/api/products/${productId}`);
        setFetchedProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!fetchedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{fetchedProduct.name}</h2>
      <p>{fetchedProduct.description}</p>
      <img src={fetchedProduct.imageSrc} alt={fetchedProduct.name} />
      {/* Other product details */}
    </div>
  );
};

export default ProductItemComponent;
