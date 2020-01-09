import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // tslint:disable-next-line: no-shadowed-variable
  const cors = require('cors');
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
