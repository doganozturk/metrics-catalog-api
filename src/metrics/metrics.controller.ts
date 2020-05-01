import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Metric } from './metric.model';
import { CreateMetricDto } from './dto/create-metric.dto';

@Controller('metrics')
export class MetricsController {
    constructor(private metricsService: MetricsService) {}

    @Get()
    async getMetrics(): Promise<Metric[]> {
        return this.metricsService.getMetrics();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createMetric(
        @Body() createMetricDto: CreateMetricDto,
    ): Promise<Metric> {
        return this.metricsService.createMetric(createMetricDto);
    }
}
