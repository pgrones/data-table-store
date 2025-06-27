import { castImmutable, produce } from 'immer';
import type { RowKey } from '../../../dataTableStore.types';
import {
  addedRowSymbol,
  isAddedRowKey,
  type EditorSlice
} from '../editorSlice';
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

    if (isAddedRowKey(this.rowKey)) {
      const producer = produce((state: EditorSlice<TEntity>) => {
        const index = state.added.findIndex(
          x => x[addedRowSymbol] === this.rowKey
        );

        state.added.splice(index, 1);
      });

      this.set(state => producer(castImmutable(state)));
    } else {
      const producer = produce((state: EditorSlice<TEntity>) => {
        state.deleted.push(this.rowKey);
      });

      this.set(state => producer(castImmutable(state)));
    }

    return true;
  };
}
