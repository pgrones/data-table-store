import type { TableStore } from "../../dataTableStore";
import type { RowKey } from "../../dataTableStore.types";
import { Command } from "./command";

export class UpdateCommand<
  TEntity extends object,
  TKey extends keyof TEntity
> extends Command<TEntity> {
  private rowKey: RowKey;
  private key: TKey;
  private value: TEntity[TKey];

  constructor(
    store: TableStore<TEntity>,
    addedRowKeyPrefix: string,
    addedRowSymbol: symbol,
    rowKey: RowKey,
    key: TKey,
    value: TEntity[TKey]
  ) {
    super(store, addedRowKeyPrefix, addedRowSymbol);
    this.rowKey = rowKey;
    this.key = key;
    this.value = value;
  }

  public execute = () => {
    super.createSnapshot();

    if (this.isAddedRowKey(this.rowKey)) return this.updateAddedRow();

    const editedRow = this.snapshot!.edited[this.rowKey];

    this.store.set(`editing.edited.${this.rowKey}`, {
      ...editedRow,
      [this.key]: this.value,
    });

    return true;
  };

  private updateAddedRow() {
    const index = this.snapshot!.added.findIndex(
      (x) => x[this.addedRowSymbol] === this.rowKey
    );

    const row = this.snapshot!.added[index];

    this.store.set(`editing.added.${index}`, {
      ...row,
      [this.key]: this.value,
    });

    return true;
  }
}
