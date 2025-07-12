import { HeaderLabel } from '../headerCell';
import { ResizeHandle } from './resizeHandle';

export interface ResizableProps {
  columnKey: string;
  children: React.ReactNode;
}

export const Resizable = ({ columnKey, children }: ResizableProps) => {
  return (
    <>
      <HeaderLabel>{children}</HeaderLabel>
      <ResizeHandle columnKey={columnKey} />
    </>
  );
};
