import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot
} from '../polymorphism';
import { headerSymbol } from './header.extensions';

export const Header = createOverridablePolymorphicComponent(props => (
  <PolymorphicRoot {...props} />
));

Header.__name = headerSymbol;

export const DefaultHeader = Header.as<React.ComponentProps<'div'>>(props => (
  <div {...props} />
));
