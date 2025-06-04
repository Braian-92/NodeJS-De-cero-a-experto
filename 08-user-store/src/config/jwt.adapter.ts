import jwt from 'jsonwebtoken';


export class JwtAdapter {

  // DI?

  static async generateToken(payload: any, duration: string = '2h') {
    return new Promise((resolve) => {
      jwt.sign(payload, "SEED", { expiresIn: duration as jwt.SignOptions['expiresIn'] }, (err, token) => {
        if ( err ) return resolve(null);
        
        resolve(token);
      });
    })
  }

  static validateToken<T>(token: string) {
    return new Promise<T|null>((resolve) => {
      jwt.verify(token, "SEED", (err, decoded) => {
        if (err) return resolve(null);
        
        resolve(decoded as T);
      });
    });
  }
}