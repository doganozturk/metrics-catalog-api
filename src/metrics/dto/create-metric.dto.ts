import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Resource {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @IsNotEmpty()
    readonly requestStart: number;

    @IsNumber()
    @IsNotEmpty()
    readonly responseEnd: number;

    @IsNumber()
    @IsNotEmpty()
    readonly startTime: number;
}

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
    @ValidateNested()
    @Type(() => Resource)
    readonly resources: Resource[];
}
