import { Header } from '@/components/owner/header';
import { SideBar } from '@/components/owner/sidebar';
import { Dashboard } from '@/components/owner/teams';

export default function Page() {
  return (
    <div className="flex">
      <Header />
      <SideBar />
      <Dashboard />
    </div>
  );
}
