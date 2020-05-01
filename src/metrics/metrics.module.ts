import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricSchema } from './metric.schema';

@Module({
    controllers: [MetricsController],
    providers: [MetricsService],
    imports: [
        MongooseModule.forFeature([{ name: 'Metric', schema: MetricSchema }]),
    ],
})
export class MetricsModule {}
