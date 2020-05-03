import {
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class GetMetricsFilteredDto {
    @IsString()
    @IsOptional()
    readonly host: string;

    @IsDateString()
    @IsOptional()
    readonly date_min: Date;

    @IsDateString()
    @IsOptional()
    readonly date_max: Date;
}
