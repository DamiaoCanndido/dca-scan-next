import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Image
        className="mx-auto mb-4"
        src="/not-found.png"
        alt="DCA Scan"
        width={500}
        height={500}
      />
      <h1 className="text-4xl font-bold text-center mb-4">
        404: Página não encontrada.
      </h1>
      <Link href="/" replace>
        <u className="text-2xl">Recarregar</u>
      </Link>
    </div>
  );
}
