import { DIContainer } from '@src/container/container';
import type {
    createEventDto,
    eventResponseDto,
    responseAllEventsDTO,
} from '../dto/event';
import { TOKENS } from '@src/container/tokens';
import { BaseDao } from '@src/dao/base-dao';
import { EventTypeRepository } from './even-type';
import { eventsTable, eventTypesTable } from '@src/db/schema';
import { sql, type InferSelectModel } from 'drizzle-orm';

export class EventRespository {
    private readonly dao = DIContainer.getInstance().resolve<
        BaseDao<createEventDto, eventResponseDto>
    >(TOKENS.DAO);

    private readonly repositoryEventType =
        DIContainer.getInstance().resolve<EventTypeRepository>(
            TOKENS.repositoryEventTypes
        );

    private mapDtoToDbEntity(eventData: createEventDto) {
        return {
            title: eventData.title,
            description: eventData.description,
            date: (eventData.date && new Date(eventData.date)) || new Date(),
            participants: eventData.participants || '',
            typeEvent: eventData.typeEvent,
            remember: eventData.remember,
            completed: eventData.completed || false,
            userId: eventData.userId,
        };
    }

    createEvent = async (
        eventData: createEventDto
    ): Promise<eventResponseDto> => {
        console.log('Creating event with data:', eventData);
        const eventTypeResult = await this.repositoryEventType.getEventTypeName(
            eventData.typeEvent as string
        );

        if (!eventTypeResult) {
            console.error('Event type not found:', eventData.typeEvent);
            throw new Error('Event type not found');
        }

        const eventNormalized = {
            ...eventData,
            typeEventId: eventTypeResult.id,
        };
        console.log('Normalized event data:', eventNormalized);

        const dbEntity = this.mapDtoToDbEntity(eventNormalized);

        const createdEvent = await this.dao.insert(dbEntity);
        console.log('Event created successfully:', createdEvent);

        return createdEvent;
    };

    getEventById = async (id: string): Promise<eventResponseDto | null> => {
        const event = await this.dao.findById(id);
        return event;
    };

    getAllEvents = async (
        limit: number,
        offset: number,
        userId: string
    ): Promise<responseAllEventsDTO | null> => {
        const filter = sql`${eventsTable.userId} = ${userId}`;
        const events = await this.dao.findAllWithJoin(
            limit,
            offset,
            eventTypesTable,
            eventTypesTable.id,
            (this.dao as any).table.id,
            filter
        );
        const totalEvents = await this.dao.count();
        const totalPages = Math.ceil(totalEvents / limit);
        return {
            pages: totalPages,
            items: events ? events : [],
        };
    };
}
