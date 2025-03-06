// src/pages/Basket/Basket.js
import React from 'react';
import { useBasket } from '../../context/BasketContext';
import styles from './Basket.module.css';

const Basket = () => {
    const { basketItems, removeFromBasket, updateQuantity } = useBasket();

    const totalPrice = basketItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Basket</h1>

            {basketItems.length === 0 ? (
                <p className={styles.empty}>Your basket is empty</p>
            ) : (
                <>
                    <div className={styles.items}>
                        {basketItems.map(item => (
                            <div key={item._id} className={styles.item}>
                                <img
                                    src={`http://localhost:5000${item.image}`}
                                    alt={item.name}
                                    className={styles.image}
                                />
                                <div className={styles.details}>
                                    <h3>{item.name}</h3>
                                    <p>${item.price.toFixed(2)}</p>
                                    <div className={styles.quantityControl}>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromBasket(item._id)}
                                        className={styles.removeButton}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summary}>
                        <h2 className={styles.total}>Total: ${totalPrice.toFixed(2)}</h2>
                        <button className={styles.checkoutButton}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Basket;