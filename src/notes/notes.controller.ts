import { Controller ,Body,Put, Delete , Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

 
    @UseGuards(AuthGuard)
    @Post()
    @ApiResponse({ status : 201 , description: 'Notes has been successfully created'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Not found'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    @ApiBody({
       type: CreateNoteDto,
       description: 'Json structure for notes object'
    })
    async createNote(@Body() createNoteDto: CreateNoteDto) {
      return this.notesService.insertNote(createNoteDto);
    }
    
    @UseGuards(AuthGuard)
    @Get() 
    @ApiResponse({ status : 200 , description: 'Notes has been successfully loaded'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Not found'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    async getNotes() {
        return this.notesService.getNotes();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiResponse({ status : 200 , description: 'Get Note by id successfully'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Not found'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    async getNote(@Param('id') id:string) {
        return this.notesService.getNote(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    @ApiResponse({ status : 201 , description: 'Notes has been successfully updated'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Not found'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    @ApiBody({
       type: UpdateNoteDto,
       description: 'Json structure for notes object'
    })
    async updateNote(
      @Param('id') id: string,
      @Body() updateNoteDto: UpdateNoteDto,
    ) {
      return this.notesService.updateNote(id, updateNoteDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiResponse({ status : 200 , description: 'Note delted successfully'})
    @ApiResponse({ status : 401, description: 'Unauthorized'})
    @ApiResponse({ status : 403, description: 'Forbidden'})
    @ApiResponse({ status : 404, description: 'Not found'})
    @ApiResponse({ status : 422, description: 'Unprocessable entity'})
    async deleteNote(@Param('id') id: string) {
       return this.notesService.deleteNote(id);
    }
}

