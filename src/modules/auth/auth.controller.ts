import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Public()
	@Post('signin')
	signin(@Body() signinDto: SigninDto) {
		return this.authService.signin(signinDto);
	}

	@Public()
	@Post('signup')
	signup(@Body() signupDto: SignupDto) {
		return this.authService.signup(signupDto);
	}
}
