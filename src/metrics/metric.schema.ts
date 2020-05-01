import * as mongoose from 'mongoose';

export const MetricSchema = new mongoose.Schema({
    id: Number,
    host: String,
    date: Date,
    ttfb: Number,
    fcp: Number,
    domContentLoaded: Number,
    windowLoaded: Number,
    resources: [
        {
            name: String,
            requestStart: Number,
            responseEnd: Number,
            startTime: Number,
        },
    ],
});
