import { DIContainer } from '@src/container/container';
import type { NextFunction, Request, Response } from 'express';
import { EventMediator } from '../mediator/event-mediator';
import { TOKENS } from '@src/container/tokens';
import { wrapperPromise } from '@src/share/utils/network/network';
import type { EventService } from '../services/event/event';
import type { eventDto } from '../dto/event';
import { BAD_REQUEST_ERROR } from 'apicustomerrors';

export class EventController {
    private readonly _eventMediator =
        DIContainer.getInstance().resolve<EventMediator>(TOKENS.eventMediator);

    private readonly _eventService =
        DIContainer.getInstance().resolve<EventService>(TOKENS.eventService);

    createEvent = async (req: Request, res: Response, next: NextFunction) => {
        const eventToCreate = req.body as unknown as eventDto;

        try {
            const [err, event] = await wrapperPromise(
                this._eventMediator.createEvent({
                    eventToCreate,
                })
            );

            if (err) {
                console.log(err);
                return next(err);
            }

            res.status(201).json(event);
        } catch (error: unknown) {
            console.error(error);
            return next(error);
        }
    };

    getEvents = async (req: Request, res: Response, next: NextFunction) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const { userId } = req.params;

        if (!userId) {
            const error = new BAD_REQUEST_ERROR({
                detail: 'userId parameter is required',
            });
            return next(error);
        }

        try {
            const [err, events] = await wrapperPromise(
                this._eventService.getAllEvents(page, limit, userId)
            );

            if (err) {
                console.log(err);
                return next(err);
            }

            res.status(200).json(events);
        } catch (error: unknown) {
            console.error(error);
            return next(error);
        }
    };
}
