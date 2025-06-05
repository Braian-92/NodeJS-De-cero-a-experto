import { Response } from 'express';
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { bcryptAdapter, JwtAdapter } from '../../config';




export class AuthService {

  // DI
  constructor () {}

  public async registerUser (registerUserDto: RegisterUserDto ) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest('User already exists');

    try {
      const user = await UserModel.create(registerUserDto);

      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      //! encriptar contraseña
      //! JWT <-- para mantener la session del usuario
      //! email de confirmacion

      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id });

      if(!token) throw CustomError.internalServer('Error while creating JWT');

      return {
        user: userEntity,
        token: token,
      };
      
    } catch (error) {
      throw CustomError.internalServer(`${ error }`);
    }

  }

  public async loginUser ( loginUserDto: LoginUserDto ) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest('Email not exists');

    const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);

    if(!isMatching) throw CustomError.badRequest('Password not valid');

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.id });

    if(!token) throw CustomError.internalServer('Error while creating JWT');

    return {
      user: userEntity,
      token: token,
    };
  }
}