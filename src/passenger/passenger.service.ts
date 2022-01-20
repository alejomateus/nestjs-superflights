import { PASSENGER } from '@common/models/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPassenger } from 'src/interfaces/passenger.interface';
import { PassengerDTO } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(@InjectModel(PASSENGER.name) private model: Model<IPassenger>) {}

  async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
    const newPassenger = new this.model(passengerDTO);
    return await newPassenger.save();
  }
  async findAll(): Promise<IPassenger[]> {
    return await this.model.find();
  }
  async findOne(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }
  async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
    const user = { ...passengerDTO };
    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }
  async delete(id: string): Promise<any> {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Deleted' };
  }
}
