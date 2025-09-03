import { DIContainer } from '@src/container/container';
import type { Request, Response } from 'express';
import { EventMediator } from '../mediator/event-mediator';
import { TOKENS } from '@src/container/tokens';
import { wrapperPromise } from '@src/share/utils/network/network';
import type { EventService } from '../services/event/event';
import type { eventDto } from '../dto/event';

export class EventController {
    private readonly _eventMediator =
        DIContainer.getInstance().resolve<EventMediator>(TOKENS.eventMediator);

    private readonly _eventService =
        DIContainer.getInstance().resolve<EventService>(TOKENS.eventService);

    createEvent = async (req: Request, res: Response) => {
        const eventToCreate = req.body as unknown as eventDto;

        try {
            const [err, event] = await wrapperPromise(
                this._eventMediator.createEvent({
                    eventToCreate,
                })
            );

            if (err) {
                console.log('Error creating event:', err);
                res.status(500).json({ error: err.message });
                return;
            }

            res.status(201).json(event);
        } catch (error: unknown) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    getEvents = async (req: Request, res: Response) => {
        try {
            const [err, events] = await wrapperPromise(
                this._eventService.getAllEvents()
            );
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json(events);
        } catch (error: unknown) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
