import { castDraft, type Draft } from 'immer';
import type { RowKey } from '../../../dataTableStore.types';
import { addedRowSymbol, isAddedRowKey } from '../editorSlice';
import { Command } from './command';

export class UpdateCommand<
  TEntity extends object,
  TKey extends keyof Draft<Partial<TEntity>>
> extends Command<TEntity> {
  private rowKey;
  private key;
  private value;

  constructor(
    rowKey: RowKey,
    key: TKey,
    value: Draft<Partial<TEntity>>[TKey],
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
      this.set(state => {
        const index = state.added.findIndex(
          row =>
            (row as Record<typeof addedRowSymbol, string>)[addedRowSymbol] ===
            this.rowKey
        );

        (state.added[index] as Draft<Partial<TEntity>>)[this.key] = this.value;
      });
    } else {
      this.set(state => {
        const row = state.edited[this.rowKey];

        if (row) {
          state.edited[this.rowKey]![this.key] = this.value;
        } else {
          state.edited[this.rowKey] = castDraft({
            [this.key]: this.value
          } as unknown as Partial<TEntity>);
        }
      });
    }

    return true;
  };
}
