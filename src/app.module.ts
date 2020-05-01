import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricsModule } from './metrics/metrics.module';
import { ConfigModule } from '@nestjs/config';

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
