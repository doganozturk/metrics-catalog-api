import { IsDateString, IsOptional } from 'class-validator';

export class GetMetricsFilteredDto {
    @IsDateString()
    @IsOptional()
    readonly date_min: Date;

    @IsDateString()
    @IsOptional()
    readonly date_max: Date;
}
