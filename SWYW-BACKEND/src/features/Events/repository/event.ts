import { DIContainer } from '@src/container/container';
import type { createEventDto, eventResponseDto } from '../dto/event';
import { TOKENS } from '@src/container/tokens';
import { BaseDao } from '@src/dao/base-dao';

export class EventRespository {
    private readonly dao = DIContainer.getInstance().resolve<
        BaseDao<createEventDto, eventResponseDto>
    >(TOKENS.DAO);

    private mapDtoToDbEntity(eventData: createEventDto) {
        return {
            title: eventData.title,
            description: eventData.description,
            date: eventData.date && new Date(eventData.date),
            participants: eventData.participants || '',
            type: eventData.type,
            remember: eventData.remember,
        };
    }

    createEvent = async (
        eventData: createEventDto
    ): Promise<eventResponseDto> => {
        const dbEntity = this.mapDtoToDbEntity(eventData);
        console.log(dbEntity);
        const createdEvent = await this.dao.insert(dbEntity);
        return createdEvent;
    };

    getEventById = async (id: string): Promise<eventResponseDto | null> => {
        const event = await this.dao.findById(id);
        return event;
    };

    getAllEvents = async (): Promise<eventResponseDto[] | null> => {
        const events = await this.dao.findAll();
        return events;
    };
}
