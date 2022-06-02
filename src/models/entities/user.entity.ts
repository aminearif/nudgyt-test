import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  @Field(() => String, { description: 'User userName ' })
  userName: string;
  @Prop({ select: false })
  @Field(() => String, { description: 'User password ' })
  password: string;
  @Prop()
  @Field(() => String, { description: 'User email ' })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(
      this.password,
      Number(process.env.HASH_SALT),
    );
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
