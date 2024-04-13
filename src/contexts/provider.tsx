import { SideBarContextProvider } from '@/contexts/siderbar';
import { AuthContextProvider } from '@/contexts/auth';

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <SideBarContextProvider>{children}</SideBarContextProvider>
    </AuthContextProvider>
  );
}
