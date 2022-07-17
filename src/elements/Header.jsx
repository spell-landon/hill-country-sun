import React from 'react';
import { classNames } from '../lib/styling_functions';
import { MENU_ITEMS } from '../lib/MENU_ITEMS';
import { Link, useLocation } from 'react-router-dom';
import { activeTab, inactiveTab, underlineHover } from '../global/classes';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className='flex justify-between items-center h-[50px] sticky top-0 bg-white z-10 w-full max-w-[1600px] mx-auto'>
      <Link to='/' className='h-full'>
        <img
          src='//img1.wsimg.com/isteam/ip/be10858b-c65a-4a43-9566-e051d6be4cf4/logo/f6348440-dab4-445b-b4da-3c9ba350e366.png/:/rs=h:80,cg:true,m/qt=q:95'
          alt='Hill Country Sun Logo'
          className='h-full py-2 px-4 cursor-pointer w-full'
        />
      </Link>

      <nav className='h-full'>
        <ul className='hidden lg:flex h-full font-medium'>
          {MENU_ITEMS.map((item) => {
            return (
              <Link
                to={`${item.link}`}
                className={classNames(
                  underlineHover,
                  pathname === item.link ? activeTab : inactiveTab
                )}
                key={`${item.label}_${item.link}`}>
                {item.label}
              </Link>
            );
          })}
        </ul>
      </nav>

      <div className='flex justify-between items-center h-full'>
        <button
          className={classNames(
            'hidden sm:block text-primary font-medium py-3 px-8 pb-[14px] tracking-widest text-sm',
            underlineHover
          )}>
          Contact
        </button>

        <button
          className={`bg-primary h-full px-2 sm:px-8 text-white border border-primary hover:bg-white hover:text-primary font-medium flex justify-center items-center inset-0 tracking-widest text-sm`}>
          Subscribe
        </button>
        <MobileMenu />
      </div>
    </div>
  );
};
