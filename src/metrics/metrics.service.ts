import { Injectable } from '@nestjs/common';
import { IMetric } from './metric.model';
import { CreateMetricDto } from './dto/create-metric.dto';
import { GetMetricsFilteredDto } from './dto/get-metrics-filtered.dto';
import { METRIC_MODEL } from './metric.constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseFilterQuery } from 'mongoose';

@Injectable()
export class MetricsService {
    constructor(
        @InjectModel(METRIC_MODEL) private readonly metricModel: Model<IMetric>,
    ) {}

    async getMetrics(): Promise<IMetric[]> {
        return this.metricModel.find({});
    }

    async getFilteredMetrics(
        getMetricsFilteredDto: GetMetricsFilteredDto,
    ): Promise<IMetric[]> {
        if (
            getMetricsFilteredDto &&
            Object.keys(getMetricsFilteredDto).length
        ) {
            const { host, date_min, date_max } = getMetricsFilteredDto;
            const filterQuery: MongooseFilterQuery<IMetric> = {};

            if (host) {
                filterQuery.host = host;
            }

            if (date_min && date_max) {
                filterQuery.date = {
                    $gte: date_min,
                    $lte: date_max,
                };
            }

            return this.metricModel.find(filterQuery);
        }

        return this.getMetrics();
    }

    async createMetric(createMetricDto: CreateMetricDto): Promise<IMetric> {
        const metric: IMetric = await this.metricModel.create(createMetricDto);

        return metric.save();
    }
}
