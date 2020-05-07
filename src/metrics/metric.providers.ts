import { Connection } from 'mongoose';
import { MetricSchema } from './metric.schema';
import { METRIC_MODEL } from './metric.constants';
import { DATABASE_CONNECTION } from '../database/database.constants';

export const metricsProviders = [
    {
        provide: METRIC_MODEL,
        useFactory: (connection: Connection) =>
            connection.model('Metric', MetricSchema),
        inject: [DATABASE_CONNECTION],
    },
];
