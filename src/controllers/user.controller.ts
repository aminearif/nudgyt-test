import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { jwtGuard } from '../guards/jwt.guard';
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
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Return all users' })
  @ApiResponse({
    status: 401,
    description: 'Foribidden',
  })
  @UseGuards(jwtGuard)
  @Get()
  async list() {
    const users = await this.userService.findAll();
    return users;
  }
}
