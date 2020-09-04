import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../users/user.entity';
import { GetUser } from './get-user.decorator';
import { AuthUserLocalResponseDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/local')
  @UseGuards(LocalAuthGuard)
  authenticateUserLocal(
    @GetUser() user: User,
  ): Promise<AuthUserLocalResponseDTO> {
    return this.authService.generateAccessToken(user);
  }
}
