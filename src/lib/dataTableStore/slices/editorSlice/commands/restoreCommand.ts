import type { RowKey } from '../../../dataTableStore.types';
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

    this.set(state => {
      const index = state.deleted.indexOf(this.rowKey);

      state.deleted.splice(index, 1);
      delete state.edited[this.rowKey];
    });

    return true;
  };
}
