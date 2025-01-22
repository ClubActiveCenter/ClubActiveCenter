/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { configModule } from './config/config.module';
import { UserModule } from './User/user.module';
import { ActivityModule } from './Activity/activity.module';
import { ProductsModule } from './Products/products.module';

@Module({
  imports: [configModule, UserModule, ActivityModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
