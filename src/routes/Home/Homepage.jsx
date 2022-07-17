import React from 'react';
import { accentLine } from '../../global/classes';
import { Hero } from '../../elements/Hero';
import { NewIssues } from '../../components/NewIssues';

export const Homepage = () => {
  return (
    <>
      <Hero
        heroImageUrl={`https://images.unsplash.com/photo-1585537666259-e8deaedc60fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2376&q=80`}
        mainText={
          <>
            Are you ready to <span className={accentLine}>explore</span> the
            Texas Hill Country?
          </>
        }
        paragraph={`We've got you covered. Since 1990, we've been bringing you stories
              of the many fascinating people, places, happenings and so much
              more that make our beautiful Hill Country a great place to live
              and visit!`}
      />
      <NewIssues />
      <div className='h-screen bg-green-300'></div>
    </>
  );
};
