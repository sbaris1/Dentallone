// app/[lang]/layout.tsx
import { getDictionary } from './dictionaries';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import '../globals.css';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body>
        <header>
          <nav>
            <LanguageSwitcher />
          </nav>
        </header>
        <main>{children}</main>
        <footer>{/* footer content */}</footer>
      </body>
    </html>
  );
}
