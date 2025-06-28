import { useEffect } from 'react';
import { LoadingOverlay, type LoadingOverlayProps } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { nprogress } from '@mantine/nprogress';
import { DataState as DataTableDataState } from '../../lib/dataTable';

export const DataState = DataTableDataState.as<
  Omit<LoadingOverlayProps, 'visible'>
>(({ isPending, overlayProps, ...props }) => {
  const [isLoaderVisible] = useDebouncedValue(isPending, 500);

  useEffect(() => {
    if (isPending) nprogress.start();
    else nprogress.complete();
  }, [isPending]);

  return (
    <LoadingOverlay
      {...props}
      visible={isPending && isLoaderVisible}
      overlayProps={{ opacity: 0.5, ...overlayProps }}
    />
  );
});
