import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    options: {
      port: 3002,
    },
    transport: Transport.TCP,
  });

  await app.startAllMicroservices();

  await app.listen(3002);
}
bootstrap();
