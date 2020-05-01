import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricsModule } from './metrics/metrics.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/metrics-catalog', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
        MetricsModule,
    ],
})
export class AppModule {}
