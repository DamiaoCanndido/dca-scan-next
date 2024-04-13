'use client';
import { LuLogOut, LuBookMarked, LuUser2 } from 'react-icons/lu';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { AuthContextGlobal } from '@/contexts/auth';

interface IconButtonProps extends ComponentProps<'aside'> {
  visible?: boolean;
}

export const SideBarContent = ({ visible, ...props }: IconButtonProps) => {
  const { username } = AuthContextGlobal();
  return (
    <>
      <aside
        {...props}
        className={
          visible
            ? 'border-r-2 border-green-900 bottom-0 fixed z-10 top-16 text-xs text-green-dark h-screen overflow-y-auto text-center bg-white w-48'
            : 'border-r-2 border-green-900 bottom-0 fixed z-10 top-16 text-xs text-green-dark h-screen overflow-y-auto text-center bg-white w-48 max-lg:hidden'
        }
      >
        <div className="h-full overflow-y-auto">
          <div className="flex flex-col justify-center items-center cursor-pointer text-white bg-green-800 p-2 h-28">
            <div className="align-center self-center pr-2">
              <LuUser2 size={30} />
            </div>
            <p>{username}</p>
          </div>
          <div className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center">
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Decretos</span>
          </div>
          <div className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center">
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Ofícios</span>
          </div>
          <div className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center">
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Leis</span>
          </div>
          <div className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center">
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Portarias</span>
          </div>
          <Link
            href="/"
            replace={true}
            className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-red-200 items-center text-red-600"
          >
            <LuLogOut size={30} />
            <span className="px-1 text-sm">Sair</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
