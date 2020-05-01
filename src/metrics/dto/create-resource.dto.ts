import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateResourceDto {
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
