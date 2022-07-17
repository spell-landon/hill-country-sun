import { classNames } from '../lib/styling_functions';

export const inactiveTab =
  'text-primary bg-white px-4 text-sm h-full appearance-none flex justify-center items-center';
export const activeTab =
  'text-white bg-primary px-4 text-sm h-full appearance-none flex justify-center items-center';
export const underlineHover = classNames(
  `inline-block relative after:absolute after:w-full after:scale-x-0 after:h-[4px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition after:duration-300 after:ease-out motion-reduce:after:invisible`,
  'hover:after:scale-x-100 hover:after:origin-bottom-left'
);
export const accentLine =
  'inline-block relative after:absolute after:w-1/2 after:bg-primary after:scale-x-100 after:h-[4px] after:-bottom-1 after:left-1/2 after:-translate-x-1/2';
