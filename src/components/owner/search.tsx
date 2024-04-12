import { AiOutlineSearch } from 'react-icons/ai';

export const Search = () => {
  return (
    <div className="flex fixed mt-16 ml-48 gap-3 h-12 items-center px-3 w-72 py-1.5 border border-green-700 rounded-lg text-sm max-lg:ml-0">
      <AiOutlineSearch size={30} color="green" />
      <input className="flex-1 outline-none" />
    </div>
  );
};
