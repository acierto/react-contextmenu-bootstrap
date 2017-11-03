import intformat from 'biguint-format';
import FlakeId from 'flake-idgen';

export const nextId = () => intformat(new FlakeId().next(), 'dec');