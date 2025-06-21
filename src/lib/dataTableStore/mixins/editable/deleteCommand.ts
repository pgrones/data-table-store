import type { TableStore } from "../../dataTableStore";
import type { RowKey } from "../../dataTableStore.types";
import { Command } from "./command";

export class DeleteCommand<TEntity extends object> extends Command<TEntity> {
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

    if (this.isAddedRowKey(this.rowKey)) return this.deleteAddedRow();

    this.store.addListItem("editing.deleted", this.rowKey);

    return true;
  };

  private deleteAddedRow() {
    const index = this.snapshot!.added.findIndex(
      (x) => x[this.addedRowSymbol] === this.rowKey
    );

    this.store.removeListItem("editing.added", index);

    return true;
  }
}
