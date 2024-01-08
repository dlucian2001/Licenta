import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ProductItem } from '../components/ProductItem'; // Adjust the path as needed

const ProductDetailsPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductItem | null>(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`/api/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <img src={product.imageSrc} alt={product.name} />
            {/* Other product details */}
        </div>
    );
};


export default ProductDetailsPage;
