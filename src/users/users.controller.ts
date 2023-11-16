import { Controller ,Body, Put, Delete, Get , Param, Post  , UseGuards ,UploadedFile, Query, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';
import { ApiBody, ApiResponse, ApiTags , ApiBearerAuth, ApiProperty, ApiQuery , ApiConsumes} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileUploadDto } from './dto/file-upload-dto';
import {FileInterceptor} from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';

export enum UserRole {
  Admin = 'Admin',
  Supervisor = 'Supervisor',
  User = 'User',
}
@ApiTags('Users')
@ApiBearerAuth()
@Controller('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard)
    @Post()
    @ApiResponse({ status : 201 , description: 'Users has been successfully created'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Userfound'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    @ApiBody({
       type: CreateUserDto,
       description: 'Json structure for Users object'
    })
  
    async createUser(@Body() createUserDto: CreateUserDto) {
      return this.usersService.insertUser(createUserDto);
    }
    
    @UseGuards(AuthGuard)
    @Get() 
    @ApiResponse({ status : 200 , description: 'Users has been successfully loaded'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Userfound'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    async getUsers() {
        return this.usersService.getUsers();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiResponse({ status : 200 , description: 'Get User by id successfully'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Userfound'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    async getUser(@Param('id') id:string) {
        return this.usersService.getUser(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @ApiResponse({ status : 201 , description: 'Users has been successfully updated'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Userfound'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    @ApiBody({
       type: UpdateUserDto,
       description: 'Json structure for Users object'
    })
    @ApiQuery({ name: 'role', enum: UserRole, required: false })
    @ApiQuery({ 
      name: 'skills',
      type: Array,
      description: 'skills',
      required: false
     })

    async updateUser(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
      @Query('role') role: UserRole = UserRole.User,
      @Query('skills') skills: []
    ) {
      updateUserDto['role'] = role;
      updateUserDto['skills'] = skills;

      return this.usersService.updateUser(id, updateUserDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiResponse({ status : 200 , description: 'User delted successfully'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Userfound'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    async deleteUser(@Param('id') id: string) {
       return this.usersService.deleteUser(id);
    }

    @UseGuards(AuthGuard)
    @Put('/upload/:id')
    @ApiResponse({ status : 201 , description: 'Users has been successfully updated'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Userfound'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    @UseInterceptors(FileInterceptor('file',{
      storage: diskStorage({
        destination:'./files',
        filename:(req, file, cb) => {
            const fileNameSplit = file.originalname.split(".");
            const fileExt = fileNameSplit[fileNameSplit.length-1]
            //cb(null,`${Date.now()}.${fileExt}`);
            cb(null,file.originalname);

        }
      })
    }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'image',
      type: FileUploadDto,
    })
    async uploadFile(@Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
       new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({maxSize: 2*1024*1024}),
           new FileTypeValidator({ fileType : /(jpg|jpeg|png)$/})
          ],
       })
    ) file: Express.Multer.File) {
      updateUserDto['image'] = file.path;
      return this.usersService.updateUser(id, updateUserDto);

    }
}

