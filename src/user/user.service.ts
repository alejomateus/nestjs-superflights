import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from '@common/models/models';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private model: Model<IUser>) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
  async create(userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });
    return await newUser.save();
  }
  async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }
  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id);
  }
  async update(id: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const user = { ...userDTO, password: hash };
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }
  async delete(id: string): Promise<any> {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Deleted' };
  }
}
