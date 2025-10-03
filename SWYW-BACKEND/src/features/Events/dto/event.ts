import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import type { eventType } from '../types/event';

export class eventDto {
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    typeEvent: eventType;

    @IsBoolean()
    @IsNotEmpty()
    remember: boolean;

    @IsString()
    @IsNotEmpty()
    userId: string;
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
    userId: string;

    @IsString()
    @IsNotEmpty()
    participants: string;

    @IsString()
    @IsNotEmpty()
    date: Date;

    @IsBoolean()
    @IsNotEmpty()
    remember: boolean;

    @IsNumber()
    @IsNotEmpty()
    typeEvent: eventType | number;

    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;
}

export class updateEventDto {
    title?: string;
    description?: string;
    date?: Date;
    participants?: string;
    typeEvent?: eventType;
    remember?: boolean;
    completed?: boolean;
}

// export class listEventsDto {
//     @IsNumber()
//     @IsNotEmpty()
//     offset: number;

//     @IsNumber()
//     @IsNotEmpty()
//     limit: number;
// }

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
    userId: string;

    @IsString()
    @IsNotEmpty()
    participants: string;

    @IsString()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty()
    typeEvent: eventType;

    @IsBoolean()
    @IsNotEmpty()
    remember: boolean;

    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;
}

export class responseAllEventsDTO {
    pages: number;
    items: Array<eventResponseDto>;
}
