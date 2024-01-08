// Product.tsx
import React from 'react';

interface ProductProps {
    name: string;
    description: string;
    imageSrc: string;
}

const Product: React.FC<ProductProps> = ({ name, description, imageSrc }) => {
    return (
        <div>
            <img src={imageSrc} alt={name} />
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Product;
