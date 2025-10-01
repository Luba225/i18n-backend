import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
    name!: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be valid' })
    email!: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password!: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Email must be valid' })
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password?: string;
}
