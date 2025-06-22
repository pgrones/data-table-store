import { LoadingOverlay, type LoadingOverlayProps } from "@mantine/core";
import { useDataTableLoadingState } from "../../dataTableStore/hooks";
import React from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

type DataStateOverlayProps = Omit<LoadingOverlayProps, "visible">;

export const DataStateOverlay = (props: DataStateOverlayProps) => {
  const { isPending, timeout } = useDataTableLoadingState();

  const isLoaderVisible = useDebouncedValue(isPending, timeout);

  console.count("DataStateOverlay");

  return (
    <LoadingOverlay
      {...props}
      visible={isPending}
      overlayProps={{ opacity: 0.5, ...props.overlayProps }}
      loaderProps={{
        children: isLoaderVisible ? undefined : <React.Fragment />,
        ...props.loaderProps,
      }}
    />
  );
};
