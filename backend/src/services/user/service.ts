import { LoginUserDto,  } from './dto';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import {hash, compare} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './schema';

@Injectable()
export class UserService {
   constructor(
    @InjectModel(User) private readonly model: typeof User,
    private jwtService: JwtService
  ) { }

  async signup(dto) {
    const existingUser = await this.model.findOne({ where: { email: dto.email } });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    dto.password = await hash(dto.password, 10);
    const user = await this.model.create({...dto});

    return {
      message: 'User successfully registered',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(dto: LoginUserDto) {
    const user = await this.model.findOne({ where: { email:dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    const userData = user.toJSON()

    const isPasswordValid = await compare(dto.password,userData.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { id: userData.id, email: userData.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      access_token: token,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      },
    };
  }

  async me(dto) {
    const user = await this.model.findOne({ where: { email:dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return {
        message: 'Login successful',
    }
  }
  
  async getUsers() {
    const users = await this.model.findAll({attributes:['name', 'id']});
    return {
        message: 'users get successful',
        data: users,
    }
  }
}
