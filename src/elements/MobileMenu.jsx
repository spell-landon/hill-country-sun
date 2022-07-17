import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import MenuIcon from '../assets/MenuIcon.png';

export const MobileMenu = () => {
  return (
    <div className='block lg:hidden'>
      <Menu>
        <Menu.Button>
          <img src={MenuIcon} alt='Menu' className='px-6 py-4 h-full w-full' />
        </Menu.Button>
        <Menu.Items className='absolute h-[calc(100vh_-_50px)] inset-0 top-[50px] w-full bg-black'>
          <Menu.Item>
            <Link to='/about' className={`text-white`}>
              About
            </Link>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};
