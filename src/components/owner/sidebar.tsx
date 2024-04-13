'use client';
import { SideBarContextGlobal } from '@/contexts/siderbar';
import { SideBarContent } from './sidebar-content';

export const SideBar = () => {
  const { showSideBar, setSideBarItem } = SideBarContextGlobal();

  return (
    <>
      {showSideBar ? <SideBarContent visible /> : <></>}
      <SideBarContent />
    </>
  );
};
