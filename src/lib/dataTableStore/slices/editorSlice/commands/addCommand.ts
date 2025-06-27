import { castImmutable, produce } from 'immer';
import type { Key, RowKey } from '../../../dataTableStore.types';
import {
  addedRowKeyPrefix,
  addedRowSymbol,
  type EditorSlice
} from '../editorSlice';
import { Command } from './command';

export class AddCommand<
  TEntity extends object,
  TRowKey extends readonly Key<TEntity>[]
> extends Command<TEntity> {
  private defaultEntity;
  private produce;

  constructor(
    defaultEntity: Omit<TEntity, TRowKey[number]>,
    ...args: ConstructorParameters<typeof Command<TEntity>>
  ) {
    super(...args);

    this.defaultEntity = defaultEntity;
    this.produce = produce((state: EditorSlice<TEntity>) => {
      state.added.push({
        [addedRowSymbol]: `${addedRowKeyPrefix}${this.getTimestamp}`,
        ...this.defaultEntity
      } as Partial<TEntity> & Record<typeof addedRowSymbol, RowKey>);
    });
  }

  public execute = () => {
    super.createSnapshot();

    this.set(state => this.produce(castImmutable(state)));

    return true;
  };

  private get getTimestamp() {
    return Date.now();
  }
}
