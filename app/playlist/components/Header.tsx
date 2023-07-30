// render the header that is defined with number, title, duration
import { Clock3, ExternalLink } from 'lucide-react';
import React from 'react';

export default function Header() {
  return (
    <>
      <div className='grid grid-cols-10 text-white'>
        <div className='col-span-1 pl-[10px]'>
          <p>#</p>
        </div>
        <div className='col-span-5'>
          <p>Title</p>
        </div>
        <div className='col-span-2'>
          <Clock3 />
        </div>
        <div className='col-span-2 flex flex-row'>Link to Preview <ExternalLink className='ml-[4px]'/></div>
      </div>
      {/** add a horizontal line */}
      <div className='mt-2 mb-2 w-full h-[2px] bg-gray-800 opacity-50'></div>
    </>
  );
}
