/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/User.entity';
import { UserModule } from 'src/User/user.module';
import { SendGridModule } from 'src/SendGrid/sendGrid.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([User]), UserModule, SendGridModule],
})
export class AuthModule {}
