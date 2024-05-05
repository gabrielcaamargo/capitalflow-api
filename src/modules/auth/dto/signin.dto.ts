import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
	@IsNotEmpty({ message: 'Username is required' })
	@IsString()
	username: string;

	@IsNotEmpty({ message: 'Password is required' })
	@IsString()
	password: string;
}
