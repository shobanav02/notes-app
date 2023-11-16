import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from './Users.model';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserRole } from './users.controller';

@Injectable()
export class UsersService {
  constructor (
    @InjectModel('Users') private readonly usersModel: Model<IUsers>
  ) {}


    async insertUser(payload: CreateUserDto) {
       const createdUser = new this.usersModel(payload);
       const result = await createdUser.save();
       return result;
    }

    async getUsers() {
        const Users = await this.usersModel.find();
        return Users;
    }

    async getUser(id:string) {
        const User = await this.usersModel.findById(id);
        return User;
    }

    async updateUser(id:string, payload:UpdateUserDto) {
        const updatedUser = await this.usersModel.findByIdAndUpdate(
            id,
            payload, {
                new: true,
            });

            if (!updatedUser) {
                throw new NotFoundException('User not found');
             }
             return updatedUser;
    }

    async deleteUser(id: string) {
        const deletedUser = await this.usersModel.findByIdAndRemove(id);
        return deletedUser;
    }

    async findOne(email: string): Promise<IUsers | undefined> {
        const Users = await this.usersModel.find();

        return Users.find(user => user.email === email);
      }
}
