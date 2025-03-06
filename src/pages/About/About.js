import React from 'react';
import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.container}>
            <h1>About Us</h1>
            <div className={styles.aboutContent}>
                <section>
                    <p>At [Your Shop Name], we're passionate about sneakers and the culture that surrounds them. Established in [year], our journey began with a simple mission: to provide sneaker enthusiasts with premium footwear that blends style, comfort, and quality.</p>
                </section>

                <section>
                    <h2>Our Story</h2>
                    <p>What started as a small collection born from our founder's passion for sneakers has evolved into a curated online destination for footwear aficionados. Each pair in our inventory is hand-selected, ensuring that we only offer the best to our community.</p>
                </section>

                <section>
                    <h2>What Sets Us Apart</h2>
                    <p>We believe that the perfect pair of sneakers is more than just footwear—it's a statement, a feeling, and sometimes even a piece of history. That's why we:</p>
                    <ul>
                        <li>Partner directly with authentic brands and verified resellers</li>
                        <li>Authenticate every pair that passes through our doors</li>
                        <li>Stay ahead of trends while honoring classic styles</li>
                        <li>Provide exceptional customer service from fellow sneakerheads</li>
                    </ul>
                </section>

                <section>
                    <h2>Our Commitment</h2>
                    <p>Customer satisfaction isn't just a goal—it's our standard. From browsing to unboxing, we strive to make your experience seamless and enjoyable. Our team is dedicated to helping you find that perfect pair that speaks to your personal style.</p>
                </section>

                <section>
                    <h2>Join Our Community</h2>
                    <p>When you shop with [Your Shop Name], you're not just a customer—you're part of our growing family of sneaker enthusiasts. Follow us on social media to stay updated on new releases, restocks, and exclusive drops.</p>
                </section>
            </div>
        </div>
    );
};

export default About;