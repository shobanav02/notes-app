import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/notesApp'), 
    NotesModule, UsersModule, AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
     .apply(LoggerMiddleware)
     .exclude('auth/login')
     .forRoutes('*')
  }
}
