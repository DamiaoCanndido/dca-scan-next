import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>404: Não encontrado</h2>
      <Link href="/login">Retorne ao login!</Link>
    </div>
  );
}
