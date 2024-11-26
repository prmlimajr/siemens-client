import type { Metadata } from 'next';
import localFont from 'next/font/local';
import StyledComponentsRegistry from '@/config/style/registry';
import GlobalStyles from './global';
import { ToastContainer } from 'react-toastify';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Mentor, a Siemens Business Code Development Project',
  description: 'Developed by Paulo Lima',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalStyles />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <ToastContainer />
      </body>
    </html>
  );
}
