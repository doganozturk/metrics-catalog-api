import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(
        bodyParser.text({
            type: 'text/plain',
        }),
    );
    app.use(
        bodyParser.json({
            type: 'application/json',
        }),
    );
    app.enableCors();

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
