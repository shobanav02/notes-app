import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user-dto';

// the PartialType method helps us extend it, but making all its properties optional.
export class UpdateUserDto extends PartialType(CreateUserDto ) {}