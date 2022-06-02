import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginDTO } from '../models/dto/login.dto';
import { RegisterDTO } from '../models/dto/register.dto';
import { UsersService } from '../services/users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Sign up fo new user' })
  @ApiResponse({
    status: 201,
    description: 'User Created',
  })
  @Post('register')
  async register(@Body() RegisterDTO: RegisterDTO) {
    const user = await this.userService.create(RegisterDTO);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: 201,
    description: 'Logged in Successfully',
  })
  @Post('login')
  async login(@Body() UserDTO: LoginDTO) {
    const user = await this.userService.findByLogin(UserDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
