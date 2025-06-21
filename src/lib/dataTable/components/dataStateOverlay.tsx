import { LoadingOverlay, type LoadingOverlayProps } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useDataTableLoadingState } from "../../dataTableStore/hooks";
import React from "react";

type DataStateOverlayProps = Omit<LoadingOverlayProps, "visible">;

export const DataStateOverlay = (props: DataStateOverlayProps) => {
  const { isPending, timeout } = useDataTableLoadingState();

  const [visible] = useDebouncedValue(isPending, timeout);

  console.count("DataStateOverlay");

  return (
    <LoadingOverlay
      {...props}
      visible={isPending}
      overlayProps={{ opacity: 0.5, ...props.overlayProps }}
      loaderProps={{
        children: visible ? undefined : <React.Fragment />,
        ...props.loaderProps,
      }}
    />
  );
};
