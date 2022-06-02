import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO } from '../models/dto/login.dto';
import { RegisterDTO } from '../models/dto/register.dto';
import { UserType } from '../types/user';
import * as bcrypt from 'bcrypt';
import { Payload } from '../types/payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserType>,
  ) {}

  async create(RegisterDTO: RegisterDTO) {
    const { email } = RegisterDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(RegisterDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  // return user object without password
  sanitizeUser(user: UserType) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  findAll() {
    // Not fetching passwords
    return this.userModel.find().select('-password').exec();
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });

    const isMatch = bcrypt.compare(password, user.password);

    // Test if user exist - email should be unique
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    } else if (isMatch) {
      console.log('CORRECT PASSWORD');
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }
}
