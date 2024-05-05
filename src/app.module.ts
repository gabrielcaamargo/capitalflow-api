import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.TYPEORM_HOST,
			port: Number(process.env.TYPEORM_PORT),
			username: process.env.TYPEORM_USER,
			password: process.env.TYPEORM_PASSWORD,
			database: process.env.TYPEORM_DATABASE,
			entities: [__dirname + '../../**/*.entity{.js, .ts}'],
			synchronize: true,
		}),
		UserModule,
		AuthModule,
	],
	controllers: [],
	providers: [
		JwtService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule { }
