import { CreateUserRequestDTO, CreateUserResponseDTO } from './users.dto';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  async createUser(
    createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    const { name, email, password } = createUserRequestDTO;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    const response = await user.save();
    const { id } = response;
    const createUserResponseDTO: CreateUserResponseDTO = { id, name, email };
    return createUserResponseDTO;
  }
}
