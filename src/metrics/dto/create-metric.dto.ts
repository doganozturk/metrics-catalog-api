import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateResourceDto } from './create-resource.dto';

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
    @Type(() => CreateResourceDto)
    readonly resources: CreateResourceDto[];
}
