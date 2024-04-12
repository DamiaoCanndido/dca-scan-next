import { Header } from '@/components/owner/header';
import { Search } from '@/components/owner/search';
import { SideBar } from '@/components/owner/sidebar';
import { Teams } from '@/components/owner/teams';

export default function Page() {
  return (
    <div className="flex">
      <Header />
      <SideBar />
      <Search />
      <Teams />
    </div>
  );
}
