import { StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';
import { NavigationProgress } from '@mantine/nprogress';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/nprogress/styles.css';
import './main.css';

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
