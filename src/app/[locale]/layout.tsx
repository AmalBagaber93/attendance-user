import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Geist, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { Metadata, Viewport } from 'next';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '../../lib/i18n/routing';
import { Providers } from '../../providers/providers';
import { dir } from '../../lib/dir';
import { cn } from '../../lib/utils';
import { Toaster } from '../../components/ui/sonner';
import { TranslationsStoreProvider } from '../../lib/store/translation-store';
import { NextLayoutProps } from '../../@types/global';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const viewport: Viewport = {
  width: 'device-width',
  viewportFit: 'cover',
  themeColor: '#006c49',
};

export const metadata: Metadata = {
  title: {
    default: 'Attendix Admin',
    template: '%s | Attendix Admin',
  },
  description: 'Event attendance and check-in management for Attendix.',
  applicationName: 'Attendix Admin',
  icons: {
    icon: '/branding/favicon.ico',
    shortcut: '/branding/favicon.ico',
  },
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout(props: unknown) {
  const { children, params } = props as NextLayoutProps;
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      dir={dir(locale)}
      className={cn('light', geist.variable, jetbrainsMono.variable)}
    >
      <head>
        <meta name='google' content='notranslate' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap'
        />
      </head>
      <body className='h-dvh overflow-hidden antialiased'>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TranslationsStoreProvider>{children}</TranslationsStoreProvider>
          </NextIntlClientProvider>
          <Toaster richColors position='top-center' />
        </Providers>
      </body>
    </html>
  );
}
