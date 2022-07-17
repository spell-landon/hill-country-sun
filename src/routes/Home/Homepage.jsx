import React from 'react';
import { Link } from 'react-router-dom';
import { accentLine } from '../../global/classes';

export const Homepage = () => {
  return (
    <>
      <div className='h-[calc(100vh_-_50px)] relative'>
        <img
          src='https://images.unsplash.com/photo-1585537666259-e8deaedc60fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2376&q=80'
          alt='bluebonnets'
          className='h-full w-full object-cover absolute'
        />

        <div className='absolute md:top-0 bottom-0 left-0 right-0 h-1/4 md:h-full md:w-1/4 bg-black'></div>
        <div className='absolute md:inset-0 bottom-1/4 h-full top- w-full md:bottom-0 md:left-1/4 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/75 to-black/0'></div>
        <div className='w-screen md:max-w-[1600px] mx-auto px-6 sm:px-12 md:pl-28 h-full relative'>
          <div className='w-full md:w-[489px] h-full flex flex-col justify-center'>
            <h2 className='text-white w-full text-4xl tracking-[0.08em] leading-[46px] md:leading-[52px] font-semibold'>
              Are you ready to <span className={accentLine}>explore</span> the
              Texas Hill Country?
            </h2>
            <p className='text-white text-2xl font-light mt-6 leading-[35px]'>
              We’ve got you covered. Since 1990, we've been bringing you stories
              of the many fascinating people, places, happenings and so much
              more that make our beautiful Hill Country a great place to live
              and visit!
            </p>
            <div className='w-full flex flex-col justify-between gap-6'>
              <p className='text-white font-light leading-[23px] mt-[6rem]'>
                Stay up to date on all things Hill Country by subscribing to our
                newsletter
              </p>
              <Link
                to='/subscribe'
                className={`bg-primary w-fit px-8 py-2 text-white border border-primary hover:bg-white hover:text-primary font-medium flex justify-center items-center inset-0 tracking-widest text-sm`}>
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-green-500/50 h-[50vh]'>SOMETHING</div>
    </>
  );
};
