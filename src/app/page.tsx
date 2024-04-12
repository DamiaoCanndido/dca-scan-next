'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex fixed items-center justify-center w-screen h-screen">
      <div className="flex items-center justify-center w-96 h-96 flex-col">
        <Input type="text" placeholder="chave" />
        <Label className="m-3">Insira sua chave.</Label>
        <Button className="w-full" onClick={() => router.replace('/create')}>
          Entrar
        </Button>
      </div>
    </div>
  );
}
