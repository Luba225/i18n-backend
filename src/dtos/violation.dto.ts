import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateViolationDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsDateString()
  date!: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsString()
  userId!: string;
}
