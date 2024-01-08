import { useState } from 'react';
import axios from 'axios';
import { ProductItem } from '../components/ProductItem';
import { Dropdown } from 'react-bootstrap';

interface AdminDashboardProps {
  setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setProducts }) => {
  const [newProduct, setNewProduct] = useState<ProductItem>({
    _id: '',
    name: '',
    description: '',
    imageSrc: '',
    category: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setNewProduct({ _id: '', name: '', description: '', imageSrc: '', category: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCategorySelect = (category: string) => {
    setNewProduct({ ...newProduct, category });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={newProduct.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={newProduct.description} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="imageSrc">Image URL:</label>
          <input type="text" id="imageSrc" name="imageSrc" value={newProduct.imageSrc} onChange={handleInputChange} />
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {newProduct.category || 'Select Category'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleCategorySelect('Concerts & Festivals')}>
              Concerts & Festivals
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategorySelect('Sports')}>Sports</Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategorySelect('For Kids')}>For Kids</Dropdown.Item>
            <Dropdown.Item onClick={() => handleCategorySelect('Theatre')}>Theatre</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
