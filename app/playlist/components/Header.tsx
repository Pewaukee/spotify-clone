// render the header that is defined with number, title, duration
import { Clock3, ExternalLink } from 'lucide-react';
import React from 'react';

export default function Header() {
  return (
    <>
      <div className='grid grid-cols-10 text-white text-sm'>
        <div className='col-span-1 pl-[10px] text-gray-400'>
          <p>#</p>
        </div>
        <div className='col-span-5 text-gray-400'>
          <p>Title</p>
        </div>
        <div className='col-span-2'>
          <Clock3
            size={16}
            color={'#9ca3af'}
          />
        </div>
        <div className='col-span-2 flex flex-row text-gray-400'>
          Preview{' '}
          <ExternalLink
            size={16}
            color={'#9ca3af'}
            className='ml-[4px] opacity-0 md:opacity-100'
          />
        </div>
      </div>
      {/** add a horizontal line */}
      <div className='mt-2 mb-2 w-full h-[2px] bg-gray-800 opacity-50'></div>
    </>
  );
}
