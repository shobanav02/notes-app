import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule , DocumentBuilder ,  } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Notes App Documentation')
    .setDescription('Notes app ')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('Notes App')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api-docs', app , document);

  await app.listen(3000);
}
bootstrap();
