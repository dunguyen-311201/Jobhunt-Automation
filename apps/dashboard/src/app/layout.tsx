import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JobHunt Dashboard',
  description: 'Nguồn, phân loại, tiêu chí và tracker cho JobHunt',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
