import { DIContainer } from '@src/container/container';
import { TOKENS } from '@src/container/tokens';
import type { createEventDto } from '../../dto/event';
import { EventRespository } from '../../repository/event';

export class EventService {
    private _repository = DIContainer.getInstance().resolve<EventRespository>(
        TOKENS.repositoryEvents
    );

    create = async (eventData: createEventDto) => {
        return await this._repository.createEvent(eventData);
    };

    getEventById = async (id: string) => {
        return await this._repository.getEventById(id);
    };

    getAllEvents = async (page: number, limit: number) => {
        const offset = (page - 1) * limit;
        return await this._repository.getAllEvents(limit, offset);
    };
}
