import type { RowKey } from '../../../dataTableStore.types';
import { addedRowSymbol, isAddedRowKey } from '../editorSlice';
import { Command } from './command';

export class DeleteCommand<TEntity extends object> extends Command<TEntity> {
  private rowKey;

  constructor(
    rowKey: RowKey,
    ...args: ConstructorParameters<typeof Command<TEntity>>
  ) {
    super(...args);

    this.rowKey = rowKey;
  }

  public execute = () => {
    super.createSnapshot();

    let isDeleted = true;

    if (isAddedRowKey(this.rowKey)) {
      this.set(state => {
        const index = state.added.findIndex(
          row =>
            (row as Record<typeof addedRowSymbol, string>)[addedRowSymbol] ===
            this.rowKey
        );

        void state.added.splice(index, 1);
      });
    }

    this.set(state => {
      if (this.rowKey in state.edited) {
        isDeleted = false;
        return;
      }

      state.deleted.push(this.rowKey);
    });

    return isDeleted;
  };
}
