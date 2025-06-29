import { useEffect } from 'react';
import { LoadingOverlay, type LoadingOverlayProps } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { nprogress } from '@mantine/nprogress';

export const DataState = ({
  overlayProps,
  isPending,
  ...props
}: LoadingOverlayProps & { isPending: boolean }) => {
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
};
