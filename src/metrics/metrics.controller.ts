import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Metric } from './metric.model';
import { CreateMetricDto } from './dto/create-metric.dto';
import { GetMetricsFilteredDto } from './dto/get-metrics-filtered.dto';

@Controller('metrics')
export class MetricsController {
    constructor(private metricsService: MetricsService) {}

    @Get()
    @UsePipes(ValidationPipe)
    async getMetrics(
        @Query() getMetricsFilteredDto: GetMetricsFilteredDto,
    ): Promise<Metric[]> {
        if (Object.keys(getMetricsFilteredDto).length) {
            return this.metricsService.getFilteredMetrics(
                getMetricsFilteredDto,
            );
        }

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
