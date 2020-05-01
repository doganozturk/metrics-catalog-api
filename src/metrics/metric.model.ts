import { Document } from 'mongoose';

export interface Metric extends Document {
    readonly id: number;
    readonly host: string;
    readonly date: Date;
    readonly ttfb: number;
    readonly fcp: number;
    readonly domContentLoaded: number;
    readonly windowLoaded: number;
    readonly resources: {
        readonly name: string;
        readonly requestStart: number;
        readonly responseEnd: number;
        readonly startTime: number;
    }[];
}
