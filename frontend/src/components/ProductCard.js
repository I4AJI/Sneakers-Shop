import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Rating from './Rating';

const ProductCard = ({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <div className="product-image-container">
            {!imageLoaded && (
              <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <Card.Img
              src={product.image}
              variant="top"
              className="product-card-image"
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`} className="text-decoration-none">
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating
              value={product.rating || 0}
              text={`${product.numReviews || 0} reviews`}
            />
          </Card.Text>

          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProductCard;