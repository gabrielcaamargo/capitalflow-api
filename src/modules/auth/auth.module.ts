import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([UserModule, AuthModule])],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule { }
