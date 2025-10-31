import { LoginUserDto, CreateUserDto } from './dto';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './service';
import { AuthGuard } from '../auth/auth-guard';
import { AuthUser } from 'src/decorators/auth';


@ApiTags('Auth')
@Controller('auth')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Validation or existing email error' })
  async signup(@Body() signupDto: CreateUserDto) {
    return this.service.signup(signupDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user and get JWT token' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  async login(@Body() loginDto: LoginUserDto) {
    return this.service.login(loginDto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current logged-in user info' })
  @ApiResponse({ status: 200, description: 'User info returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async me(@AuthUser() user) {
    return this.service.me(user);
  }
}
