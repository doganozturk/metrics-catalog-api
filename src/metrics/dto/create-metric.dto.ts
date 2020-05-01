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
    host: string;

    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    ttfb: number;

    @IsNumber()
    @IsNotEmpty()
    fcp: number;

    @IsNumber()
    @IsNotEmpty()
    domContentLoaded: number;

    @IsNumber()
    @IsNotEmpty()
    windowLoaded: number;

    @IsArray()
    resources: {
        name: string;
        requestStart: number;
        responseEnd: number;
        startTime: number;
    }[];
}
