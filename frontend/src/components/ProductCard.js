import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Rating from './Rating';

const ProductCard = ({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
  
  // Преобразование пути к изображению
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300?text=No+Image';
    return imagePath.startsWith('/') ? `${apiUrl}${imagePath}` : imagePath;
  };

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
              src={getImageUrl(product.image)} 
              variant="top" 
              className="product-card-image" 
              style={{ opacity: imageLoaded ? 1 : 0 }}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300?text=Image+Error'; 
              }}
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
