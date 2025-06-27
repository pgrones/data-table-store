import { castDraft } from 'immer';
import type { Key, RowKey } from '../../../dataTableStore.types';
import { addedRowKeyPrefix, addedRowSymbol } from '../editorSlice';
import { Command } from './command';

export class AddCommand<
  TEntity extends object,
  TRowKey extends readonly Key<TEntity>[]
> extends Command<TEntity> {
  private defaultEntity;

  constructor(
    defaultEntity: Omit<TEntity, TRowKey[number]>,
    ...args: ConstructorParameters<typeof Command<TEntity>>
  ) {
    super(...args);

    this.defaultEntity = defaultEntity;
  }

  public execute = () => {
    super.createSnapshot();

    this.set(state => {
      state.added.push(
        castDraft({
          [addedRowSymbol]: `${addedRowKeyPrefix}${this.getTimestamp}`,
          ...this.defaultEntity
        } as Partial<TEntity> & Record<typeof addedRowSymbol, RowKey>)
      );
    });

    return true;
  };

  private get getTimestamp() {
    return Date.now();
  }
}
