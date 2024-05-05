import { IsString, IsNotEmpty, Matches, IsEmail } from 'class-validator';

export class SignupDto {
	@IsString()
	@IsNotEmpty({ message: 'Username is required' })
	username: string;

	@IsString()
	@IsEmail()
	@IsNotEmpty({ message: 'Email is required' })
	email: string;

	@IsString()
	@IsNotEmpty()
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]{8,}$/, { message: 'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.' })
	password: string;
}
