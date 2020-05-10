import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricSchema } from './metric.schema';
import { METRIC_MODEL } from './metric.constants';

@Module({
    controllers: [MetricsController],
    providers: [MetricsService],
    imports: [
        MongooseModule.forFeature([
            { name: METRIC_MODEL, schema: MetricSchema },
        ]),
    ],
})
export class MetricsModule {}
