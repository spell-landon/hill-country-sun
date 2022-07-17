import React from 'react';
import { Header } from '../elements/Header';

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
