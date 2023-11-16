import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty ,IsNumber,IsOptional , IsString, IsStrongPassword, isNumber} from 'class-validator';


export class CreateUserDto {
    
   @ApiProperty({
      example:'John',
      required: true
    })
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty({
      example:'Peter',
      required: false
    })
    @IsOptional()
    @IsString()
    last_name: string;

    @ApiProperty({
      example:'john@gmail.com',
      required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example:'Password',
        required: true
    })  
    @IsStrongPassword()
    password: string;

    @ApiProperty({ type: [String] })
    @IsArray()
    skills: string[];

    @ApiProperty({
      type: Number,
    })
    @IsNumber()
    age: number;
    
  }
