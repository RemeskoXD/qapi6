import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Administrace | QAPI',
  description: 'Administrační rozhraní pro správu poptávek a statistik QAPI.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
