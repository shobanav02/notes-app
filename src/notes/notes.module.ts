import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesSchema } from './notes.model';
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Notes',
      schema: NotesSchema
   }]),
],
  providers: [NotesService],
  controllers: [NotesController]
})
export class NotesModule {}
