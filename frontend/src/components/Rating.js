import React from 'react';
import { motion } from 'framer-motion';

const Rating = ({ value, text, color = '#f8e825' }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          whileHover={{ scale: 1.3, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <i
            style={{ color }}
            className={
              value >= star
                ? 'fas fa-star'
                : value >= star - 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
            }
          ></i>
        </motion.span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;