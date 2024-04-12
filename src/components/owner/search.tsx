import { LuSearch } from 'react-icons/lu';

export const Search = () => {
  return (
    <div className="flex fixed mt-16 ml-48 gap-3 h-12 items-center px-3 w-auto py-1.5 border border-green-700 rounded-lg text-sm max-lg:ml-0">
      <button>
        <LuSearch size={20} color="green" />
      </button>
      <input className="flex-1 border-0" />
    </div>
  );
};
