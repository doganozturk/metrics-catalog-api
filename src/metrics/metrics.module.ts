import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { metricsProviders } from './metric.providers';
import { MetricsRepository } from './metrics.repository';

@Module({
    controllers: [MetricsController],
    providers: [MetricsRepository, MetricsService, ...metricsProviders],
    imports: [DatabaseModule],
})
export class MetricsModule {}
