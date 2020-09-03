import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthUserLocalRequestDTO, AuthUserLocalResponseDTO } from './auth.dto';
import { User } from 'src/users/user.entity';
import { JwtPayload } from './jwt-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticateUserLocal(
    authUserLocalRequestDTO: AuthUserLocalRequestDTO,
  ): Promise<User> {
    const { email, password } = authUserLocalRequestDTO;
    const user = await this.usersService.validateUserByEmailAndPassword(
      email,
      password,
    );
    return user;
  }

  async generateAccessToken(user: User): Promise<AuthUserLocalResponseDTO> {
    const { id, email } = user;
    const payload: JwtPayload = { id, email };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
