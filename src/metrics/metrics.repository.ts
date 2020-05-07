import { Inject, Injectable } from '@nestjs/common';
import { METRIC_MODEL } from './metric.constants';
import { Model, MongooseFilterQuery } from 'mongoose';
import { IMetric } from './metric.model';
import { CreateMetricDto } from './dto/create-metric.dto';
import { GetMetricsFilteredDto } from './dto/get-metrics-filtered.dto';

@Injectable()
export class MetricsRepository {
    constructor(
        @Inject(METRIC_MODEL) private readonly metricModel: Model<IMetric>,
    ) {}

    async find(
        getMetricsFilteredDto?: GetMetricsFilteredDto,
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

        return this.metricModel.find({});
    }

    async create(createMetricDto: CreateMetricDto): Promise<IMetric> {
        const metric: IMetric = await this.metricModel.create(createMetricDto);

        return metric.save();
    }
}
