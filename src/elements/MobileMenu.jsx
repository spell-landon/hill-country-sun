import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import MenuIcon from '../assets/MenuIcon.png';
import { MENU_ITEMS } from '../lib/MENU_ITEMS';
import { classNames } from '../lib/styling_functions';
import { accentLine, underlineHover } from '../global/classes';

export const MobileMenu = ({ pathname }) => {
  return (
    <div className='block lg:hidden'>
      <Menu>
        <Menu.Button>
          <img src={MenuIcon} alt='Menu' className='px-6 py-4 h-full w-full' />
        </Menu.Button>
        <Menu.Items className='absolute h-[calc(100vh_-_50px)] inset-0 top-[50px] w-full bg-black px-8 py-16 flex flex-col justify-start items-start gap-8'>
          {MENU_ITEMS.map((item) => {
            return (
              <Menu.Item>
                <Link
                  to={item.link}
                  className={classNames(
                    `text-white text-3xl font-semibold`,
                    underlineHover,
                    pathname === item.link ? accentLine : ''
                  )}>
                  {item.label}
                </Link>
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Menu>
    </div>
  );
};
