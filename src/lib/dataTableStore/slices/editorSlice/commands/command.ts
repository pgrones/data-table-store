import type { EditorSlice } from '../editorSlice';

export abstract class Command<TEntity extends object> {
  private state;
  protected set;
  protected snapshot: Pick<
    EditorSlice<TEntity>,
    'added' | 'edited' | 'deleted'
  > | null;

  constructor(
    state: EditorSlice<TEntity>,
    set: (
      updater:
        | Partial<EditorSlice<TEntity>>
        | ((state: EditorSlice<TEntity>) => EditorSlice<TEntity>)
    ) => void
  ) {
    this.snapshot = null;
    this.state = state;
    this.set = set;
  }

  public abstract execute(): boolean;

  public undo() {
    if (this.snapshot === null) return;

    this.set(this.snapshot);
  }

  protected createSnapshot() {
    this.snapshot = {
      added: this.state.added,
      deleted: this.state.deleted,
      edited: this.state.edited
    };
  }
}
