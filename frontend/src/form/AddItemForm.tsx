import React, { useState } from 'react';

const AddItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setItemDescription(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Perform action to add item using the data (itemName, itemDescription)
        console.log('Item added:', itemName, itemDescription);
        // You'll need to send this data to your backend API here
    };

    return (
        <div>
            <h2>Add Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="itemName">Item Name:</label>
                    <input
                        type="text"
                        id="itemName"
                        value={itemName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="itemDescription">Item Description:</label>
                    <textarea
                        id="itemDescription"
                        value={itemDescription}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItemForm;
