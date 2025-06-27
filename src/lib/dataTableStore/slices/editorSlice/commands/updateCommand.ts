import { castImmutable, produce } from 'immer';
import type { RowKey } from '../../../dataTableStore.types';
import {
  addedRowSymbol,
  isAddedRowKey,
  type EditorSlice
} from '../editorSlice';
import { Command } from './command';

export class UpdateCommand<
  TEntity extends object,
  TKey extends keyof TEntity
> extends Command<TEntity> {
  private rowKey;
  private key;
  private value;

  constructor(
    rowKey: RowKey,
    key: TKey,
    value: TEntity[TKey],
    ...args: ConstructorParameters<typeof Command<TEntity>>
  ) {
    super(...args);

    this.rowKey = rowKey;
    this.key = key;
    this.value = value;
  }

  public execute = () => {
    super.createSnapshot();

    if (isAddedRowKey(this.rowKey)) {
      const producer = produce((state: EditorSlice<TEntity>) => {
        const index = state.added.findIndex(
          x => x[addedRowSymbol] === this.rowKey
        );

        (state.added[index] as Partial<TEntity>)[this.key] = this.value;
      });

      this.set(state => producer(castImmutable(state)));
    } else {
      const producer = produce((state: EditorSlice<TEntity>) => {
        const row = state.edited[this.rowKey];

        if (row) {
          state.edited[this.rowKey]![this.key] = this.value;
        } else {
          state.edited[this.rowKey] = {
            [this.key]: this.value
          } as unknown as Partial<TEntity>;
        }
      });

      this.set(state => producer(castImmutable(state)));
    }

    return true;
  };
}
