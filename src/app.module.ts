import { Module } from '@nestjs/common';
import { MetricsModule } from './metrics/metrics.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule, MetricsModule],
})
export class AppModule {}
