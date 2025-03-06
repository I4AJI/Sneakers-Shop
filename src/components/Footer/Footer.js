import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <p>Copyright © Maksym Sobchuk 2025</p>
            </div>
        </footer>
    );
};

export default Footer;