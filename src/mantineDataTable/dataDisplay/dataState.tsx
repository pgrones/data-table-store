import { useDebouncedValue } from '@mantine/hooks';
import { DataState as DataTableDataState } from '../../lib/dataTable';
import { LoadingOverlay, type LoadingOverlayProps } from '@mantine/core';
import { nprogress } from '@mantine/nprogress';
import { useEffect } from 'react';

export const DataState = DataTableDataState.as<
  Omit<LoadingOverlayProps, 'visible'>
>(({ isPending, pendingTimeout, overlayProps, ...props }) => {
  const [isLoaderVisible] = useDebouncedValue(isPending, pendingTimeout);

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
