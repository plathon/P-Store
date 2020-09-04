import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  @Get()
  @UseGuards(JwtAuthGuard)
  listProducts(@GetUser() user: User): string[] {
    console.log(user);
    return ['test1', 'test2', 'test3'];
  }
}
