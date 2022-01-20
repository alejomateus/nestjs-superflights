import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async create(@Body() userDTO: UserDTO): Promise<any> {
    return await this.userService.create(userDTO);
  }
}
