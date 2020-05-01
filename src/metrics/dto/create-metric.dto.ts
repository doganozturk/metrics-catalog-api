import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class CreateMetricDto {
    @IsString()
    @IsNotEmpty()
    readonly host: string;

    @IsDateString()
    @IsNotEmpty()
    readonly date: Date;

    @IsNumber()
    @IsNotEmpty()
    readonly ttfb: number;

    @IsNumber()
    @IsNotEmpty()
    readonly fcp: number;

    @IsNumber()
    @IsNotEmpty()
    readonly domContentLoaded: number;

    @IsNumber()
    @IsNotEmpty()
    readonly windowLoaded: number;

    @IsArray()
    readonly resources: {
        readonly name: string;
        readonly requestStart: number;
        readonly responseEnd: number;
        readonly startTime: number;
    }[];
}
