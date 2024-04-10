import { SideBarContextProvider } from '@/contexts/siderbar';

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SideBarContextProvider>{children}</SideBarContextProvider>;
}
