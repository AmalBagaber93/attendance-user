'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { ThemeProvider } from 'next-themes';
import { queryClient } from '../lib/query-client';


type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [qc] = useState(() => queryClient);

  return (
    <QueryClientProvider client={qc}>
      <ThemeProvider attribute='class' defaultTheme='light' forcedTheme='light'>
        <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} position='top' buttonPosition='bottom-left' />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
