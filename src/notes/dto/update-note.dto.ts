import { PartialType } from '@nestjs/mapped-types'
import { CreateNoteDto } from './create-note.dto';

// the PartialType method helps us extend it, but making all its properties optional.
export class UpdateNoteDto extends PartialType(CreateNoteDto) {}