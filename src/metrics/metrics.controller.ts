import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { IMetric } from './metric.model';
import { CreateMetricDto } from './dto/create-metric.dto';
import { GetMetricsFilteredDto } from './dto/get-metrics-filtered.dto';
import { ParseBeaconRequestInterceptor } from './parse-beacon-request.interceptor';

@Controller('metrics')
export class MetricsController {
    constructor(private metricsService: MetricsService) {}

    @Get()
    @UsePipes(ValidationPipe)
    async getMetrics(
        @Query() getMetricsFilteredDto: GetMetricsFilteredDto,
    ): Promise<IMetric[]> {
        if (Object.keys(getMetricsFilteredDto).length) {
            return this.metricsService.getFilteredMetrics(
                getMetricsFilteredDto,
            );
        }

        return this.metricsService.getMetrics();
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseInterceptors(ParseBeaconRequestInterceptor)
    async createMetric(
        @Body() createMetricDto: CreateMetricDto,
    ): Promise<IMetric> {
        return this.metricsService.createMetric(createMetricDto);
    }
}
