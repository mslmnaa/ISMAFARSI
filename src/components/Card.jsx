import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  onClick = null,
  ...props
}) => {
  const baseStyles = 'rounded-lg bg-white dark:bg-dark-card shadow-soft p-6 transition-smooth';
  const hoverStyles = hover ? 'hover:shadow-hover hover:-translate-y-1 cursor-pointer' : '';

  const combinedClass = `${baseStyles} ${hoverStyles} ${className}`;

  if (hover) {
    return (
      <motion.div
        className={combinedClass}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={combinedClass} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
