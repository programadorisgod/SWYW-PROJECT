import { DIContainer } from '@src/container/container';
import { Router } from 'express';
import { EventController } from '../controllers/event';
import { TOKENS } from '@src/container/tokens';

const eventRouter = Router();

const PREFIX = '/api/events';

export const createEventRouter = () => {
    const controller = DIContainer.getInstance().resolve<EventController>(
        TOKENS.eventController
    );
    eventRouter.post(PREFIX, controller.createEvent);

    eventRouter.get(`${PREFIX}/users/:userId`, controller.getEvents);

    return eventRouter;
};
