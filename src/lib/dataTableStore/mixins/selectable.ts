import type { RowKey } from '../dataTableStore.types';
import type { StoreBase } from './mixin';

export const Selectable = <
  TBase extends StoreBase<TEntity>,
  TEntity extends object
>(
  Base: TBase
) =>
  class extends Base {
    public toggleRowSelection = (rowKey: RowKey) => {
      if (!this.state.selectedRows.includes(rowKey)) {
        this.addListItem('selectedRows', rowKey);
        return;
      }

      const keyIndex = this.state.selectedRows.indexOf(rowKey);

      this.removeListItem('selectedRows', keyIndex);
      return;
    };

    public toggleAllRowSelections = () => {
      const allKeys = this.state.data.map(this.getKey);

      if (allKeys.length !== this.state.selectedRows.length) {
        this.set('selectedRows', allKeys);
        return;
      }

      this.set('selectedRows', []);
    };
  };
