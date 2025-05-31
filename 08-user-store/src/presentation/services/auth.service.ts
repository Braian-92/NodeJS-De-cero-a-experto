import { UserModel } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";




export class AuthService {

  // DI
  constructor () {}

  public async registerUser (registerUserDto: RegisterUserDto ) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) return CustomError.badRequest('User already exists');

    // return 'todo ok!';
    try {
      const user = await UserModel.create(registerUserDto);
      await user.save();
      return user;
    } catch (error) {
      throw CustomError.internalServer(`${ error }`);
    }

  }
}