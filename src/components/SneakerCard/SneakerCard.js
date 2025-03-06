import React from 'react';
import './SneakerCard.css';

const SneakerCard = ({ sneaker }) => {
    return (
        <div className="sneaker-card">
            {sneaker.image && (
                <img
                    src={`http://localhost:5000/${sneaker.image}`}
                    alt={sneaker.name}
                    className="sneaker-image"
                />
            )}
            <h3 className="sneaker-name">{sneaker.name}</h3>
            <p className="sneaker-brand">{sneaker.brand}</p>
            <p className="sneaker-price">${sneaker.price.toFixed(2)}</p>
            {sneaker.inStock ? (
                <p className="in-stock">In Stock</p>
            ) : (
                <p className="out-of-stock">Out of Stock</p>
            )}
        </div>
    );
};

export default SneakerCard;