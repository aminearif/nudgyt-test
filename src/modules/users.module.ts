import { Module } from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { UsersResolver } from '../resolvers/users.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from '../models/entities/user.entity'
import { UserController } from '../controllers/user.controller'
import { AuthService } from '../auth/auth.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      }
    ])
  ],
  exports: [UsersService],
  providers: [UsersResolver, UsersService, AuthService],
  controllers: [UserController]
})
export class UsersModule {}
