import { useEffect, type PropsWithChildren } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import type { DataTableStore } from '../dataTableStore/dataTableStore';
import type { DataTableData } from '../dataTableStore/dataTableStore.types';
import { DataTableContext } from './dataTable.context';
import { typedMemo } from './dataTable.types';

type DataTableProviderProps<TEntity extends object> = PropsWithChildren<{
  store: DataTableStore<TEntity>;
  data: DataTableData<TEntity> | undefined;
}>;

export const DataTableProvider = <TEntity extends object>({
  children,
  store,
  data
}: DataTableProviderProps<TEntity>) => {
  const { setData } = useStore(
    store,
    useShallow(state => ({
      setData: state.setData
    }))
  );

  useEffect(() => {
    if (data) setData(data);
  }, [data, setData]);

  return <MemoizedContext store={store}>{children}</MemoizedContext>;
};

const MemoizedContext = typedMemo(
  <TEntity extends object>({
    children,
    store
  }: PropsWithChildren<{ store: DataTableStore<TEntity> }>) => (
    <DataTableContext value={store as never}>{children}</DataTableContext>
  ),
  (prev, next) => prev.store === next.store
);
