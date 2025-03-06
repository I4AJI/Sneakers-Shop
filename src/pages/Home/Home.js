import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>Welcome to Sneakers Shop</h1>
                <p className={styles.subtitle}>Discover the latest trends in footwear</p>
                <Link to="/catalog" className={styles.exploreButton}>
                    Explore Collection
                </Link>
            </div>
        </div>
    );
};

export default Home;