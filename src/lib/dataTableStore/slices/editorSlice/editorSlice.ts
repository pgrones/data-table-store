import { castImmutable, produce } from 'immer';
import type { StateCreator } from 'zustand';
import type { Key, RowKey } from '../../dataTableStore.types';
import {
  AddCommand,
  Command,
  DeleteCommand,
  RestoreCommand,
  UpdateCommand
} from './commands';

export const addedRowKeyPrefix = 'data-table-added-row-';
export const addedRowSymbol = Symbol('data-table');

export const isAddedRowKey = (rowKey: RowKey) =>
  rowKey.startsWith(addedRowKeyPrefix);

export interface EditorSlice<TEntity extends object> {
  added: (Partial<TEntity> & Record<typeof addedRowSymbol, RowKey>)[];
  edited: Record<RowKey, Partial<TEntity>>;
  deleted: RowKey[];
  history: Command<TEntity>[];
  undoHistory: Command<TEntity>[];
  addRow: () => void;
  updateRow: <TKey extends keyof TEntity>(
    rowKey: RowKey,
    key: TKey,
    value: TEntity[TKey]
  ) => void;
  deleteRow: (rowKey: RowKey) => void;
  restoreRow: (rowKey: RowKey) => void;
  undo: () => void;
  redo: () => void;
  resetEditor: () => void;
}

export const createEditorSlice =
  <TEntity extends object, TRowKey extends readonly Key<TEntity>[]>(
    createEntity?: () => Omit<TEntity, TRowKey[number]>
  ): StateCreator<EditorSlice<TEntity>> =>
  (set, get) => {
    const executeCommand = (command: Command<TEntity>) => {
      if (!command.execute()) return;

      const producer = produce((state: EditorSlice<TEntity>) => {
        state.history.push(command);
        state.undoHistory = [];

        if (state.history.length > 100) state.history.shift();
      });

      set(state => producer(castImmutable(state)));
    };

    return {
      added: [],
      edited: {},
      deleted: [],
      history: [],
      undoHistory: [],
      addRow: () => {
        if (!createEntity)
          throw new Error(
            'Cannot add a new row if no entityFactory was provided to the store'
          );

        executeCommand(new AddCommand(createEntity(), get(), set));
      },
      updateRow: (...args) =>
        executeCommand(new UpdateCommand(...args, get(), set)),
      deleteRow: rowKey =>
        executeCommand(new DeleteCommand(rowKey, get(), set)),
      restoreRow: rowKey =>
        executeCommand(new RestoreCommand(rowKey, get(), set)),
      undo: () => {
        const command = get().history.at(-1);

        if (!command) return;

        command.undo();

        const producer = produce((state: EditorSlice<TEntity>) => {
          state.undoHistory.push(state.history.pop()!);
        });

        set(state => producer(castImmutable(state)));
      },
      redo: () => {
        const command = get().undoHistory.at(-1);

        if (!command) return;

        command.execute();

        const producer = produce((state: EditorSlice<TEntity>) => {
          state.history.push(state.undoHistory.pop()!);
        });

        set(state => producer(castImmutable(state)));
      },
      resetEditor: () =>
        set({
          added: [],
          edited: {},
          deleted: [],
          history: [],
          undoHistory: []
        })
    };
  };
