import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty ,IsOptional , IsString } from 'class-validator';


export class CreateNoteDto {
    
  @ApiProperty({
     example:'first note',
     required: true
  })
    @IsNotEmpty()
    @IsString()
    title: string;
    
  @ApiProperty({
      example:'first note description',
      required: true
   })
    @IsNotEmpty()
    @IsString()
    description: string;


  @ApiProperty({
      example:'1',
      required: true
   })
    @IsNotEmpty()
    @IsString()
    user_id: string;

  }
