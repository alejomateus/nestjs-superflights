import { Delete, Param, Put } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@Controller('passenger')
export class PassengerController {
  constructor(private passengerService: PassengerService) {}
  @Post()
  async create(@Body() passengerDTO: PassengerDTO): Promise<any> {
    return await this.passengerService.create(passengerDTO);
  }
  @Get()
  async findAll() {
    return await this.passengerService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.passengerService.findOne(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO) {
    return this.passengerService.update(id, passengerDTO);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.passengerService.delete(id);
  }
}
