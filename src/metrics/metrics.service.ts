import { Injectable } from '@nestjs/common';
import { Metric } from './metric.model';
import { CreateMetricDto } from './dto/create-metric.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseFilterQuery } from 'mongoose';
import { GetMetricsFilteredDto } from './dto/get-metrics-filtered.dto';

@Injectable()
export class MetricsService {
    constructor(
        @InjectModel('Metric') private readonly metricModel: Model<Metric>,
    ) {}

    async getMetrics(): Promise<Metric[]> {
        return this.metricModel.find({}).exec();
    }

    async getFilteredMetrics(
        getMetricsFilteredDto: GetMetricsFilteredDto,
    ): Promise<Metric[]> {
        const { date_min, date_max } = getMetricsFilteredDto;
        const filterQuery: MongooseFilterQuery<Metric> = {};

        if (date_min && date_max) {
            filterQuery.date = {
                $gte: date_min,
                $lte: date_max,
            };
        }

        return this.metricModel.find(filterQuery).exec();
    }

    async createMetric(createMetricDto: CreateMetricDto): Promise<Metric> {
        const metric: Metric = new this.metricModel(createMetricDto);

        return metric.save();
    }
}
