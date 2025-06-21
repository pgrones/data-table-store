import type { TableStore } from "../../dataTableStore";
import type { Editing, RowKey } from "../../dataTableStore.types";

export abstract class Command<TEntity extends object> {
  protected snapshot: Omit<Editing<TEntity>, "history"> | null;
  protected store: TableStore<TEntity>;
  protected addedRowKeyPrefix: string;
  protected addedRowSymbol: symbol;

  constructor(
    store: TableStore<TEntity>,
    addedRowKeyPrefix: string,
    addedRowSymbol: symbol
  ) {
    this.snapshot = null;
    this.store = store;
    this.addedRowKeyPrefix = addedRowKeyPrefix;
    this.addedRowSymbol = addedRowSymbol;
  }

  protected createSnapshot() {
    const editingState = this.store.getSnapshot().editing;

    this.snapshot = {
      added: editingState.added,
      deleted: editingState.deleted,
      edited: editingState.edited,
    };
  }

  public abstract execute(): boolean;

  public undo() {
    if (this.snapshot !== null)
      this.store.apply({
        "editing.added": this.snapshot.added,
        "editing.deleted": this.snapshot.deleted,
        "editing.edited": this.snapshot.edited,
      });
  }

  protected isAddedRowKey = (rowKey: RowKey) => {
    return rowKey.startsWith(this.addedRowKeyPrefix);
  };
}
