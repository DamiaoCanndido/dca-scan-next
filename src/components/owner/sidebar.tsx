'use client';
import { SideBarContextGlobal } from '@/contexts/siderbar';
import { SideBarContent } from './sidebar-content';

export const SideBar = () => {
  const { showSideBar } = SideBarContextGlobal();

  return (
    <>
      {showSideBar ? <SideBarContent visible /> : <></>}
      <SideBarContent />
    </>
  );
};
