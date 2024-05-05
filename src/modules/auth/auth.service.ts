import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';

import { hash, compare } from 'bcryptjs';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		@InjectRepository(User)
		private readonly userRepo: Repository<User>
	) { }

	async signin({ username, password }: SigninDto) {
		const user = await this.userRepo.findOne({
			where: { username }
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		const isValidPassword = await compare(password, user.password);

		if (!isValidPassword) {
			throw new BadRequestException('Invalid credentials');
		}

		const accessToken = await this.generateAccessToken(user.id);
		delete user.password;
		return {
			...user,
			accessToken,
		};
	}

	async signup({ email, password, username }: SignupDto) {
		const userExists = await this.userRepo.findOne({
			where: [
				{ email },
				{ username }
			]
		});

		if (userExists) {
			throw new BadRequestException('This user has already been registered');
		}

		const hashedPassword = await hash(password, 12);

		return this.userRepo.save({
			email,
			username,
			password: hashedPassword
		});
	}

	private generateAccessToken(userId: string) {
		return this.jwtService.signAsync(
			{ sub: userId },
			{ secret: process.env.JWT_SECRET },
		);
	}
}
