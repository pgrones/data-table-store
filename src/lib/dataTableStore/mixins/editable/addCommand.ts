import type { TableStore } from "../../dataTableStore";
import { Command } from "./command";

export class AddCommand<TEntity extends object> extends Command<TEntity> {
  private defaultEntity: Partial<TEntity>;

  constructor(
    store: TableStore<TEntity>,
    addedRowKeyPrefix: string,
    addedRowSymbol: symbol,
    defaultEntity: Partial<TEntity>
  ) {
    super(store, addedRowKeyPrefix, addedRowSymbol);
    this.defaultEntity = defaultEntity;
  }

  public execute = () => {
    super.createSnapshot();

    const rowKey = `${this.addedRowKeyPrefix}${this.getTimestamp}`;

    this.store.addListItem("editing.added", {
      [this.addedRowSymbol]: rowKey,
      ...this.defaultEntity,
    });

    return true;
  };

  private get getTimestamp() {
    return Date.now();
  }
}
