import React from 'react';
import { accentLine } from '../global/classes';
import { classNames } from '../lib/styling_functions';
import { HCS_LATEST_ISSUES } from '../lib/sample_data';
import { Button } from '../elements/Button';
import { IssueCard } from '../elements/Cards/IssueCard';

export const NewIssues = () => {
  return (
    <div className='py-12 flex flex-col justify-between items-center gap-6'>
      <h3 className={classNames('font-semibold text-4xl', accentLine)}>
        Latest Issues
      </h3>
      <div className='flex gap-12'>
        {HCS_LATEST_ISSUES.map((item) => {
          return <IssueCard data={item} key={item.link} />;
        })}
      </div>
      <Button to='/'>All Issues</Button>
    </div>
  );
};
