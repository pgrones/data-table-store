import type { TableStore } from "../../dataTableStore";
import type { RowKey } from "../../dataTableStore.types";
import { Command } from "./command";

export class RestoreCommand<TEntity extends object> extends Command<TEntity> {
  private rowKey: RowKey;

  constructor(
    store: TableStore<TEntity>,
    addedRowKeyPrefix: string,
    addedRowSymbol: symbol,
    rowKey: RowKey
  ) {
    super(store, addedRowKeyPrefix, addedRowSymbol);
    this.rowKey = rowKey;
  }

  public execute = () => {
    super.createSnapshot();

    const deletedIndex = this.snapshot!.deleted.indexOf(this.rowKey);

    this.store.removeListItem("editing.deleted", deletedIndex);
    this.store.delete(`editing.edited.${this.rowKey}`);

    return true;
  };
}
