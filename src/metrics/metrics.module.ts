import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { metricsProviders } from './metric.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    controllers: [MetricsController],
    providers: [MetricsService, ...metricsProviders],
    imports: [DatabaseModule],
})
export class MetricsModule {}
