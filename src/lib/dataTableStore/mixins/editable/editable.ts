import type { RowKey } from "../../dataTableStore.types";
import type { StoreBase } from "../mixin";
import { AddCommand } from "./addCommand";
import { Command } from "./command";
import { DeleteCommand } from "./deleteCommand";
import { RestoreCommand } from "./RestoreCommand";
import { UpdateCommand } from "./updateCommand";

export const Editable = <
  TBase extends StoreBase<TEntity>,
  TEntity extends object
>(
  Base: TBase
) =>
  class extends Base {
    private addedRowKeyPrefix = "data-table-added-row-";

    public addRow = () => {
      if (this.entityFactory === null)
        throw new Error(
          "Can not add a new row if no entityFactory was provided to the store"
        );

      this.executeCommand(
        new AddCommand(
          this,
          this.addedRowKeyPrefix,
          this.addedRowSymbol,
          this.entityFactory()
        )
      );
    };

    public updateRow = <TKey extends keyof TEntity>(
      rowKey: RowKey,
      key: TKey,
      value: TEntity[TKey]
    ) => {
      this.executeCommand(
        new UpdateCommand(
          this,
          this.addedRowKeyPrefix,
          this.addedRowSymbol,
          rowKey,
          key,
          value
        )
      );
    };

    public deleteRow = (rowKey: RowKey) => {
      this.executeCommand(
        new DeleteCommand(
          this,
          this.addedRowKeyPrefix,
          this.addedRowSymbol,
          rowKey
        )
      );
    };

    public restoreRow = (rowKey: RowKey) => {
      this.executeCommand(
        new RestoreCommand(
          this,
          this.addedRowKeyPrefix,
          this.addedRowSymbol,
          rowKey
        )
      );
    };

    public undo = () => {
      const command = this.state.editing.history.at(-1);

      if (!command) return;

      command.undo();

      this.removeListItem(
        "editing.history",
        this.state.editing.history.length - 1
      );
    };

    private executeCommand(command: Command<TEntity>) {
      if (command.execute()) {
        this.addListItem("editing.history", command);
      }

      if (this.state.editing.history.length > 100) {
        this.removeListItem("editing.history", 0);
      }
    }
  };
