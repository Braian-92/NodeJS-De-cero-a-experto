import { Response } from 'express';
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { bcryptAdapter, envs, JwtAdapter } from '../../config';
import { EmailService } from './email.service';




export class AuthService {

  // DI
  constructor (
    //! DI - Email service
    private readonly emailService: EmailService,
  ) {}

  public async registerUser (registerUserDto: RegisterUserDto ) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest('User already exists');

    try {
      const user = await UserModel.create(registerUserDto);

      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      //! email de confirmacion
      await this.senEmailValidationLink(user.email);

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

  private senEmailValidationLink = async ( email: string ) => {
    const token = await JwtAdapter.generateToken({ email });

    if(!token) throw CustomError.internalServer('Error getting token');

    const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;

    const html = `
      <h1>Validate your account</h1>
      <p>Click on the link to validate your account</p>
      <a href="${ link }">Validate account: ${ email }</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your account',
      htmlBody: html,
    }

    const isSent = await this.emailService.sendEmail(options);

    if(!isSent) throw CustomError.internalServer('Error sending email');

    return true;
  }
}