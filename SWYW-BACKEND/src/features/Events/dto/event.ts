import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import type { eventType } from '../types/event';

export class eventDto {
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    type: eventType;

    @IsBoolean()
    @IsNotEmpty()
    remember: boolean;
}

export class createEventDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    participants: string;

    @IsString()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty()
    type: eventType;

    @IsBoolean()
    @IsNotEmpty()
    remember: boolean;
}

export class updateEventDto {
    title?: string;
    description?: string;
    date?: Date;
}

export class listEventsDto {
    @IsNumber()
    @IsNotEmpty()
    offset: number;

    @IsNumber()
    @IsNotEmpty()
    limit: number;
}

export class eventResponseDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty()
    type: eventType;

    @IsBoolean()
    @IsNotEmpty()
    remember: boolean;
}
