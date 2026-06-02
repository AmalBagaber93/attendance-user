import { Locale } from 'next-intl';

export type NextPageProps<T extends Record<string, string> = object> = {
  searchParams?: Promise<any>;
  params: Promise<
    {
      locale: Locale;
    } & T
  >;
};

export type NextLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}>;
