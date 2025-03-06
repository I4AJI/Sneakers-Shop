import React from 'react';
import styles from './ReleaseCard.module.css';
import { FaRegCalendarAlt } from 'react-icons/fa';

const ReleaseCard = ({ sneaker }) => {
    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <span className={styles.brand}>{sneaker.brand}</span>
                <div className={styles.date}>
                    <FaRegCalendarAlt className={styles.icon} />
                    {new Date(sneaker.releaseDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>
            </div>
            <h3 className={styles.name}>{sneaker.name}</h3>
            <div className={styles.details}>
                <span className={styles.price}>${sneaker.price}</span>
                <span className={styles.productCode}>{sneaker.productCode}</span>
            </div>
            <img
                src={sneaker.image
                    ? `http://localhost:5000${sneaker.image.replace(/\\/g, "/")}`
                    : process.env.PUBLIC_URL + '/placeholder-image.jpg'
                }
                alt={sneaker.name}
                className={styles.image}
                onError={(e) => {
                    e.target.src = process.env.PUBLIC_URL + '/placeholder-image.jpg';
                }}
            />
        </article>
    );
};

export default ReleaseCard;