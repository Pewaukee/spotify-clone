import { Rewind } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export default function RewindButton({
  index,
  setIndex,
}: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}) {
  const previous = () => {
    setIndex(index - 1);
  };

  return (
    <button onClick={previous}>
      <Rewind
        size={20}
        className='ml-2 hover:text-gray-300'
      />
    </button>
  );
}
