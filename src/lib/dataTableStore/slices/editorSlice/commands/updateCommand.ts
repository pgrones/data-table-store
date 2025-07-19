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

    let hasChanged = true;

    if (isAddedRowKey(this.rowKey)) {
      this.set(state => {
        const index = state.added.findIndex(
          row =>
            (row as Record<typeof addedRowSymbol, string>)[addedRowSymbol] ===
            this.rowKey
        );

        const row = state.added[index] as Draft<Partial<TEntity>>;

        if (row[this.key] === this.value) {
          hasChanged = false;
          return;
        }

        row[this.key] = this.value;
      });

      return hasChanged;
    }

    this.set(state => {
      if (state.deleted.includes(this.rowKey)) {
        hasChanged = false;
        return;
      }

      let row = state.edited[this.rowKey];

      if (row) {
        if (row[this.key] === this.value) {
          hasChanged = false;
          return;
        }

        row[this.key] = this.value;
        return;
      }

      row = state.data.find(
        x => state.getKey(x as Partial<TEntity>) === this.rowKey
      );

      if (row && row[this.key] === this.value) {
        hasChanged = false;
        return;
      }

      state.edited[this.rowKey] = castDraft({
        [this.key]: this.value
      } as unknown as Partial<TEntity>);
    });

    return hasChanged;
  };
}
