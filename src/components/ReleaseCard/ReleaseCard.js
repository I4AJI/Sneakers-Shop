// src/components/ReleaseCard/ReleaseCard.js
import React from 'react';
import { useBasket } from '../../context/BasketContext';
import styles from './ReleaseCard.module.css';

const ReleaseCard = ({ sneaker }) => {
    const { addToBasket } = useBasket();

    return (
        <div className={styles.card}>
            {sneaker.image && (
                <img
                    src={`http://localhost:5000${sneaker.image}`}
                    alt={sneaker.name}
                    className={styles.image}
                />
            )}
            <h3 className={styles.name}>{sneaker.name}</h3>
            <p className={styles.brand}>{sneaker.brand}</p>
            <p className={styles.price}>${sneaker.price.toFixed(2)}</p>
            <button
                onClick={() => addToBasket(sneaker)}
                className={styles.basketButton}
            >
                Add to Basket
            </button>
        </div>
    );
};

export default ReleaseCard;