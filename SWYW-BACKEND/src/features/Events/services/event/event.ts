import { DIContainer } from '@src/container/container';
import { TOKENS } from '@src/container/tokens';
import type { createEventDto } from '../../dto/event';
import { EventRespository } from '../../repository/event';
import { wrapperPromise } from '@src/share/utils/network/network';
import { URL_USER_SERVICE } from '@src/config/app.config';
import { NOT_FOUND_ERROR } from 'apicustomerrors';

const ITEM_NOT_FOUND = 404;
export class EventService {
    private _repository = DIContainer.getInstance().resolve<EventRespository>(
        TOKENS.repositoryEvents
    );

    validateIfTheUserExists = async (userId: string) => {
        const [err, response] = await wrapperPromise(
            fetch(`${URL_USER_SERVICE}/users?id=${userId}`)
        );
        if (err) {
            throw new Error('Failed to fetch user data');
        }

        if (!response) {
            throw new Error('No response from user service');
        }

        if (response.status === ITEM_NOT_FOUND) {
            throw new NOT_FOUND_ERROR({
                detail: `User not found in user service, with id: ${userId}`,
            });
        }

        if (!response.ok) {
            console.error('Invalid response from user service');
            throw new Error('Invalid response from user service');
        }
    };

    create = async (eventData: createEventDto) => {
        console.log('Creating event:', eventData.userId);
        await this.validateIfTheUserExists(eventData.userId);
        console.log('User exists, proceeding to create event');
        return await this._repository.createEvent(eventData);
    };

    getEventById = async (id: string) => {
        return await this._repository.getEventById(id);
    };

    getAllEvents = async (page: number, limit: number, userId: string) => {
        await this.validateIfTheUserExists(userId);
        const offset = (page - 1) * limit;
        return await this._repository.getAllEvents(limit, offset, userId);
    };
}
