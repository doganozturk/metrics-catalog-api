import { Injectable } from '@nestjs/common';
import { Metric } from './metric.model';
import { CreateMetricDto } from './dto/create-metric.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MetricsService {
    constructor(
        @InjectModel('Metric') private readonly metricModel: Model<Metric>,
    ) {}

    async getMetrics(): Promise<Metric[]> {
        return this.metricModel.find({}).exec();
    }

    async createMetric(createMetricDto: CreateMetricDto): Promise<Metric> {
        const metric: Metric = new this.metricModel(createMetricDto);

        return metric.save();
    }
}
