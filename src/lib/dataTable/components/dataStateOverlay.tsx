import { LoadingOverlay, type LoadingOverlayProps } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useDataTableDataState } from "../../dataTableStore/hooks";

type DataStateOverlayProps = Omit<LoadingOverlayProps, "visible">;

export const DataStateOverlay = (props: DataStateOverlayProps) => {
  const isPending = useDataTableDataState();

  const [visible] = useDebouncedValue(isPending, 500);

  console.count("DataStateOverlay");

  return (
    <LoadingOverlay
      {...props}
      visible={visible}
      overlayProps={{ opacity: 0.1, ...props.overlayProps }}
    />
  );
};
