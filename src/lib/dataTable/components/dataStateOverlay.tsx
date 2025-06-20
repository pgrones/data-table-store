import { LoadingOverlay, type LoadingOverlayProps } from "@mantine/core";
import { useDataTableDataState } from "../../dataTableStore/hooks/useDataTableDataState";
import { useDebouncedValue } from "@mantine/hooks";

type DataStateOverlayProps = Omit<LoadingOverlayProps, "visible">;

export const DataStateOverlay = (props: DataStateOverlayProps) => {
  const isPending = useDataTableDataState();

  const [visible] = useDebouncedValue(isPending, 500);

  return (
    <LoadingOverlay
      visible={visible}
      overlayProps={{ opacity: 0.1, ...props.overlayProps }}
      {...props}
    />
  );
};
