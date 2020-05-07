import { Inject, Injectable } from '@nestjs/common';
import { IMetric } from './metric.model';
import { CreateMetricDto } from './dto/create-metric.dto';
import { GetMetricsFilteredDto } from './dto/get-metrics-filtered.dto';
import { MetricsRepository } from './metrics.repository';

@Injectable()
export class MetricsService {
    constructor(private readonly metricsRepository: MetricsRepository) {}

    async getMetrics(): Promise<IMetric[]> {
        return this.metricsRepository.find();
    }

    async getFilteredMetrics(
        getMetricsFilteredDto: GetMetricsFilteredDto,
    ): Promise<IMetric[]> {
        return this.metricsRepository.find(getMetricsFilteredDto);
    }

    async createMetric(createMetricDto: CreateMetricDto): Promise<IMetric> {
        return this.metricsRepository.create(createMetricDto);
    }
}
