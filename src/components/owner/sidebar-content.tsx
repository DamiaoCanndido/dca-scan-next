'use client';
import { LuLogOut, LuBookMarked, LuUser2 } from 'react-icons/lu';
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import { ComponentProps, useEffect } from 'react';
import { AuthContextGlobal } from '@/contexts/auth';
import { clearCookies } from '@/helpers/cookies';
import { SideBarContextGlobal } from '@/contexts/siderbar';

interface IconButtonProps extends ComponentProps<'aside'> {
  visible?: boolean;
}

export const SideBarContent = ({ visible, ...props }: IconButtonProps) => {
  const { username, setUsername } = AuthContextGlobal();
  const { setShowSideBar } = SideBarContextGlobal();

  useEffect(() => {
    setUsername(getCookie('user')!);
  }, []);

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
          <Link
            href="/decree"
            className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center"
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Decretos</span>
          </Link>
          <Link
            href="/notice"
            className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center"
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Ofícios</span>
          </Link>
          <Link
            href="/law"
            className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center"
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Leis</span>
          </Link>
          <Link
            href="/ordinance"
            className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center"
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Portarias</span>
          </Link>
          <Link
            href="/login"
            replace={true}
            className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-red-200 items-center text-red-600"
            onClick={() => {
              clearCookies(['user', 'token']);
            }}
          >
            <LuLogOut size={30} />
            <span className="px-1 text-sm">Sair</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
