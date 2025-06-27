import { castImmutable, produce } from 'immer';
import type { RowKey } from '../../../dataTableStore.types';
import type { EditorSlice } from '../editorSlice';
import { Command } from './command';

export class RestoreCommand<TEntity extends object> extends Command<TEntity> {
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

    const producer = produce((state: EditorSlice<TEntity>) => {
      const index = state.deleted.indexOf(this.rowKey);

      state.deleted.splice(index, 1);
      delete state.edited[this.rowKey];
    });

    this.set(state => producer(castImmutable(state)));

    return true;
  };
}
