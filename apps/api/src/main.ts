import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.enableCors();

    // Global Prefix
    app.setGlobalPrefix('api');

    // Bind to 0.0.0.0 to be accessible outside Docker
    await app.listen(3000, '0.0.0.0');

    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
