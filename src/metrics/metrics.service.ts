import { Injectable } from '@nestjs/common';
import { Metric } from './metric.model';
import { v1 as uuid } from 'uuid';
import { CreateMetricDto } from './dto/create-metric.dto';

@Injectable()
export class MetricsService {
    private metrics: Metric[] = [];

    getMetrics(): Metric[] {
        return this.metrics;
    }

    createMetric(createMetricDto: CreateMetricDto): Metric {
        const metric: Metric = {
            id: uuid(),
            ...createMetricDto,
        };

        this.metrics.push(metric);

        return metric;
    }
}
