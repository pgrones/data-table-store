import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';

import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import { NavigationProgress } from '@mantine/nprogress';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider forceColorScheme="dark">
      <NavigationProgress />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);
