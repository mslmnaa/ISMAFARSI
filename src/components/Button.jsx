import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-smooth inline-flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'text-white bg-primary-700 hover:bg-primary-700/90 shadow-soft hover:shadow-hover',
    secondary: 'text-primary-700 bg-primary-50 hover:bg-primary-100 shadow-soft',
    outline: 'text-primary-700 border-2 border-primary-700 hover:bg-primary-50',
    ghost: 'text-primary-700 hover:bg-primary-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
