import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({ to, children }) => {
  const primaryButton =
    'bg-primary w-fit px-8 py-2 text-white border border-primary hover:bg-white hover:text-primary font-medium flex justify-center items-center inset-0 tracking-widest font-semibold active:shadow-inner';
  return (
    <>
      {to ? (
        <Link to={to} className={primaryButton}>
          {children}
        </Link>
      ) : (
        <button className={primaryButton}>{children}</button>
      )}
    </>
  );
};
