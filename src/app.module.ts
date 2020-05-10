import { Module } from '@nestjs/common';
import { MetricsModule } from './metrics/metrics.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
        MetricsModule,
    ],
})
export class AppModule {}
