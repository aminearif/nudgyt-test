import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UsersService } from '../services/users.service'
import { User } from '../models/entities/user.entity'
import { CreateUserInput } from '../models/dto/create-user.input'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { LoggedUserOutput } from '../models/dto/logged.dto'
import { AuthService } from '../auth/auth.service'
import { LoginInput } from '../types/gql.login'

@Resolver(() => User)
export class UsersResolver {
  constructor (
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @Mutation(() => User)
  createUser (@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  // return token without user object - different from Rest api post  request
  @Mutation(() => LoggedUserOutput)
  async register (@Args('register') createUserInput: CreateUserInput) {
    const user = await this.userService.create(createUserInput)
    const payload = {
      email: user.email,
    }

    const token = this.authService.signPayload(payload)
    return { token }
  }

  // return token without user object - different from Rest api post  request
  @Mutation(() => LoggedUserOutput)
  async login (@Args('login') loginInput: LoginInput) {
    const user = await this.userService.findByLogin(loginInput)
    const payload = {
      email: user.email,
    }

    const token = this.authService.signPayload(payload)
    return { token }
  }

  // You need the pass token in header otherwise th request will fail
  @UseGuards(JwtAuthGuard)
  @Query(() => [User], { name: 'users' })
  findAll () {
    return this.userService.findAll()
  }

}
