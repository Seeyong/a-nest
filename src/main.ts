import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port: number = parseInt(process.env.PORT);
  await app.listen(port);
  console.log(`Listening on port: ${port}`);
}
bootstrap();
