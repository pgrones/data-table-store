import { StrictMode } from 'react';
import { createTheme, MantineProvider, Tooltip } from '@mantine/core';
import { NavigationProgress } from '@mantine/nprogress';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/dates/styles.css';
import './main.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true
    }
  }
});

const theme = createTheme({
  cursorType: 'pointer',
  components: {
    Tooltip: Tooltip.extend({
      styles: { tooltip: { fontSize: 'var(--mantine-font-size-xs)' } },
      defaultProps: {
        openDelay: 500,
        withArrow: true
      }
    })
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider forceColorScheme="dark" theme={theme}>
      <NavigationProgress />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);
