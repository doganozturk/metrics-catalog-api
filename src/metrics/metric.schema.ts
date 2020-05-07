import * as mongoose from 'mongoose';

export const MetricSchema = new mongoose.Schema({
    host: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    ttfb: {
        type: Number,
        required: true,
    },
    fcp: {
        type: Number,
        required: true,
    },
    domContentLoaded: {
        type: Number,
        required: true,
    },
    windowLoaded: {
        type: Number,
        required: true,
    },
    resources: [
        {
            name: {
                type: String,
                required: true,
            },
            requestStart: {
                type: Number,
                required: true,
            },
            responseEnd: {
                type: Number,
                required: true,
            },
            startTime: {
                type: Number,
                required: true,
            },
        },
    ],
});
