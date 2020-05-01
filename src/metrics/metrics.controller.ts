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
    getMetrics(): Metric[] {
        return this.metricsService.getMetrics();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createMetric(@Body() createMetricDto: CreateMetricDto): Metric {
        return this.metricsService.createMetric(createMetricDto);
    }
}
