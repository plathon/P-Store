import { CreateUserRequestDTO, CreateUserResponseDTO } from './users.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  async createUser(
    createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    const { name, email, password } = createUserRequestDTO;
    const salt = await genSalt();
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await hash(password, salt);
    const response = await user.save();
    const { id } = response;
    const token = await sign({ id, name, email }, process.env.APP_SECRET);
    const createUserResponseDTO: CreateUserResponseDTO = { accessToken: token };
    return createUserResponseDTO;
  }

  async validateUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Use and password not match');
    }
    return user;
  }
}
