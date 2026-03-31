import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Stránka nenalezena</p>
      <Link href="/" className="mt-8 text-primary hover:underline">
        Zpět na hlavní stranu
      </Link>
    </div>
  );
}
