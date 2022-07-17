import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const IssueCard = ({ data }) => {
  return (
    <Link
      to={data.link}
      className='flex flex-col gap-4 h-fit w-[200px] items-center'>
      <motion.img
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        src={data.imageUrl}
        alt={`${data.link}_${data.title}`}
        className='h-full w-full aspect-square object-cover'
      />
      <p className='font-semibold'>{data.title}</p>
    </Link>
  );
};
