import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Buenro Tech Assessment')
    .setVersion(process.env.npm_package_version || '0.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory, {
    useGlobalPrefix: true,
    customSiteTitle: 'Buenro Tech Assessment',
    swaggerOptions: {
      defaultModelRendering: 'model',
      layout: 'BaseLayout',
      tagsSorter: 'alpha',
      deepLinking: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);

  Logger.log(`🚀 Application is running on ${await app.getUrl()}`);
}

void bootstrap();
