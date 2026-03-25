import { Outfit } from 'next/font/google';
import Providers from '@/providers/Providers';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
});

export const metadata = {
  title: 'AuthDash - Dashboard',
  description: 'Your personalized authentication dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
