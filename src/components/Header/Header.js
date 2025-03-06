import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = ({ cartItems }) => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link to="/">SneakersShop</Link>
                </div>

                <div className={styles.links}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.link
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/catalog"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.link
                        }
                    >
                        Catalog
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.link
                        }
                    >
                        About Us
                    </NavLink>
                </div>

                <div className={styles.cart}>
                    <Link to="/basket" className={styles.cartLink}>
                        <FaShoppingCart className={styles.cartIcon} />
                        {cartItems.length > 0 && (
                            <span className={styles.cartCount}>{cartItems.length}</span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;