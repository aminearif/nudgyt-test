import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@ObjectType()
export class LoggedUserOutput {

  @Field(() => String, { description: 'Generated access_token of the user' })
  token: string
}
