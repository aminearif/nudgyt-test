import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { MongoModule } from '../modules/mongo.module';
import { GraphqlModule } from '../modules/graphql.module';

@Module({
  imports: [GraphqlModule, MongoModule, ConfigModule],
  exports: [GraphqlModule, MongoModule, ConfigModule],
})
export class CommonModule {}
