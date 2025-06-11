import { v4 as uuidv4 } from 'uuid';

export class Uuid {
  //! metodo tradicional
  // static v4() {
  //   return uuidv4();
  // }

  //! metodo equivalente
  static v4 = () => uuidv4();
}