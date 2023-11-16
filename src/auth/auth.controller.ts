import { Controller , Body , Post , HttpCode , HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiResponse({ status : 201 , description: 'Users has been successfully created'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Userfound'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    @ApiBody({
        type: LoginDto,
        description: 'Json structure for Users object'
     })
      async  login(@Body() loginDto: Record<string,any>) {
        return this.authService.login(loginDto.email, loginDto.password);

    }
}
