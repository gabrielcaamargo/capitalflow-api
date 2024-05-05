import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';

import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		@InjectRepository(User)
		private readonly userRepo: Repository<User>
	) { }

	async signup({ email, password, username }: SignupDto) {
		const userExists = await this.userRepo.findOne({
			where: [
				{
					email
				},
				{
					username
				}
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
}
