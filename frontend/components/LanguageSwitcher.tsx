'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { locales } from '../lib/i18nConfig'; // move `locales` here if needed

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const { lang: currentLang } = useParams();

  const pathnameWithoutLocale = pathname.replace(`/${currentLang}`, '') || '/';

  return (
    <div className="language-switcher">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${pathnameWithoutLocale}`}
          className={`lang-btn ${currentLang === locale ? 'active' : ''}`}
        >
          {locale === 'en' ? '🇺🇸 EN' : '🇹🇷 TR'}
        </Link>
      ))}

      <style jsx>{`
        .language-switcher {
          display: flex;
          gap: 8px;
        }
        .lang-btn {
          padding: 4px 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          text-decoration: none;
          color: #333;
        }
        .lang-btn.active {
          background: #f0f0f0;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
