import { Response } from 'express';
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";




export class AuthService {

  // DI
  constructor () {}

  public async registerUser (registerUserDto: RegisterUserDto ) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest('User already exists');

    try {
      const user = await UserModel.create(registerUserDto);
      await user.save();

      //! encriptar contraseña
      //! JWT <-- para mantener la session del usuario
      //! email de confirmacion

      const { password, ...userEntity } = UserEntity.fromObject(user);
      return {
        user: userEntity,
        token: 'ABC',
      };
      
    } catch (error) {
      throw CustomError.internalServer(`${ error }`);
    }

  }
}