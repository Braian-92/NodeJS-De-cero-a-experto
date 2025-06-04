import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const bcryptAdapter = {
  hash: (pasword: string) => {
    const salt = genSaltSync(10);
    return hashSync(pasword, salt);
  },

  compare: (pasword: string, hashed: string) => {
    return compareSync(pasword, hashed); 
  }
}