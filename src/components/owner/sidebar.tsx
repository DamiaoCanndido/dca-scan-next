'use client';
import { AiOutlineBook, AiOutlineLogout } from 'react-icons/ai';
import { SideBarContextGlobal } from '@/contexts/siderbar';
import Link from 'next/link';

export const SideBar = () => {
  const { showSideBar, setSideBarItem } = SideBarContextGlobal();

  const changeSideBarItem = (item: string) => {
    setSideBarItem(item);
  };

  return (
    <>
      {showSideBar ? (
        <aside className="border-r-2 border-green-900 bottom-0 fixed z-10 top-16 text-xs text-green-dark h-screen p-2 overflow-y-auto text-center bg-white w-48">
          <div className="h-full overflow-y-auto">
            <div
              className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center"
              onClick={() => {
                changeSideBarItem('teams');
              }}
            >
              <AiOutlineBook size={30} />
              <span className="px-1 text-sm">Times</span>
            </div>
            <div
              className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center"
              onClick={() => {
                changeSideBarItem('leagues');
              }}
            >
              <AiOutlineBook size={30} />
              <span className="px-1 text-sm">Ligas</span>
            </div>
            <div
              className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center"
              onClick={() => {
                changeSideBarItem('matches');
              }}
            >
              <AiOutlineBook size={30} />
              <span className="px-1 text-sm">Jogos</span>
            </div>
            <Link href="/" replace={true}>
              <div
                className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-red-200 items-center text-red-600"
                onClick={() => {
                  changeSideBarItem('sair');
                }}
              >
                <AiOutlineLogout size={30} />
                <span className="px-1 text-sm">Sair</span>
              </div>
            </Link>
          </div>
        </aside>
      ) : (
        <div></div>
      )}
      <aside className="border-r-2 border-green-900 bottom-0 fixed z-10 top-16 text-xs text-green-dark h-screen p-2 overflow-y-auto text-center bg-white w-48 max-lg:hidden">
        <div className="h-full overflow-y-auto">
          <div
            className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center"
            onClick={() => {
              changeSideBarItem('teams');
            }}
          >
            <AiOutlineBook size={30} />
            <span className="px-1 text-sm">Times</span>
          </div>
          <div
            className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center"
            onClick={() => {
              changeSideBarItem('leagues');
            }}
          >
            <AiOutlineBook size={30} />
            <span className="px-1 text-sm">Ligas</span>
          </div>
          <div
            className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-green-200 items-center"
            onClick={() => {
              changeSideBarItem('matches');
            }}
          >
            <AiOutlineBook size={30} />
            <span className="px-1 text-sm">Jogos</span>
          </div>
          <Link href="/" replace={true}>
            <div
              className="flex cursor-pointer border-b-2 border-green-900 pr-8 py-2 hover:bg-red-200 items-center text-red-600"
              onClick={() => {
                changeSideBarItem('sair');
              }}
            >
              <AiOutlineLogout size={30} />
              <span className="px-1 text-sm">Sair</span>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};
