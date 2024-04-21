'use client';
import { LuLogOut, LuBookMarked, LuUser2 } from 'react-icons/lu';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { AuthContextGlobal } from '@/contexts/auth';
import { clearCookies } from '@/helpers/cookies';
import { SideBarContextGlobal } from '@/contexts/siderbar';

interface IconButtonProps extends ComponentProps<'aside'> {
  visible?: boolean;
}

export const SideBarContent = ({ visible, ...props }: IconButtonProps) => {
  const { username, setUsername } = AuthContextGlobal();
  const { showSideBar, setShowSideBar } = SideBarContextGlobal();

  const [sideBarTab, setSideBarTab] = useState('');

  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUsername(getCookie('user')!);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSideBar &&
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setShowSideBar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <aside
        ref={sideBarRef}
        {...props}
        className={
          visible
            ? 'border-r bg-green-50 border-gray-200 bottom-0 fixed z-10 top-16 text-xs text-green-900 h-screen overflow-y-auto text-center w-48'
            : 'border-r bg-green-50 border-gray-200 bottom-0 fixed z-10 top-16 text-xs text-green-900 h-screen overflow-y-auto text-center w-48 max-lg:hidden'
        }
      >
        <div className="h-full overflow-y-auto">
          <div className="flex border-b border-green-600 flex-col justify-center items-center cursor-pointer text-green-900 bg-green-50 p-2 h-28">
            <div className="align-center self-center pr-2">
              <LuUser2 size={30} />
            </div>
            <p>{username}</p>
          </div>
          <Link
            href="/decree"
            replace
            className={
              sideBarTab === 'decree'
                ? 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center bg-green-300'
                : 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center'
            }
            onClick={() => {
              setShowSideBar(false);
              setSideBarTab('decree');
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Decretos</span>
          </Link>
          <Link
            href="/notice"
            replace
            className={
              sideBarTab === 'notice'
                ? 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center bg-green-300'
                : 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center'
            }
            onClick={() => {
              setShowSideBar(false);
              setSideBarTab('notice');
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Ofícios</span>
          </Link>
          <Link
            href="/law"
            replace
            className={
              sideBarTab === 'law'
                ? 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center bg-green-300'
                : 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center'
            }
            onClick={() => {
              setShowSideBar(false);
              setSideBarTab('law');
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Leis</span>
          </Link>
          <Link
            href="/ordinance"
            replace
            className={
              sideBarTab === 'ordinance'
                ? 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center bg-green-300'
                : 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center'
            }
            onClick={() => {
              setShowSideBar(false);
              setSideBarTab('ordinance');
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Portarias</span>
          </Link>
          <Link
            href="/login"
            replace
            className="flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-red-200 items-center text-red-600"
            onClick={() => {
              clearCookies(['user', 'token']);
              setSideBarTab('');
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
