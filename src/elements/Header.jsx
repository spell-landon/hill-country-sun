import React from 'react';
import { Link } from 'react-router-dom';

const LinkClass =
  'text-primary px-4 hover:bg-primary hover:text-white text-sm h-full py-4 appearance-none border-none';

export const Header = () => {
  return (
    <div className='flex justify-between items-center'>
      <button className='px-4 py-3 hover:bg-gray-200'>Hill Country Sun</button>
      <ul className='flex h-full font-medium'>
        <Link to='/about' className={`${LinkClass}`}>
          About
        </Link>
        <Link to='/calendar' className={`${LinkClass}`}>
          Calendar
        </Link>
        <Link to='/welcome-to-wimberley' className={`${LinkClass}`}>
          Welcome to Wimberley
        </Link>
        <Link to='/river-region-guide' className={`${LinkClass}`}>
          River Region Guide
        </Link>
      </ul>
      <div className='flex justify-between items-center'>
        <button
          className={`text-primary font-medium hover:text-primary/75 py-3 px-8`}>
          Contact
        </button>
        <button
          className={`bg-primary py-3 px-8 text-white border border-primary hover:bg-white hover:text-primary font-medium`}>
          Subscribe
        </button>
      </div>
    </div>
  );
};
