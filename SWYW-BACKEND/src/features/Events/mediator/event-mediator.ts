import { DIContainer } from '@src/container/container';
import type { createEventDto, eventDto } from '../dto/event';
import { TOKENS } from '@src/container/tokens';
import type { NlpProcessor } from '../services/nlp/nlp-processor';
import { EventService } from '../services/event/event';

export class EventMediator {
    async createEvent({ eventToCreate }: { eventToCreate: eventDto }) {
        const container = DIContainer.getInstance();
        // 1. NLP (finished)
        // 2. Event creation (finished)
        // 3. Event scheduling (next)
        // 4. Event notification (next)
        const nlpProcessor = container.resolve<NlpProcessor>(TOKENS.nlp);

        const nlpOutput = await nlpProcessor.process(eventToCreate);

        if (nlpOutput instanceof Error) {
            throw nlpOutput;
        }

        const eventPayload = {
            ...nlpOutput,
            type: eventToCreate.typeEvent,
            remember: eventToCreate.remember,
        };

        const eventService = container.resolve<EventService>(
            TOKENS.eventService
        );

        const savedEvent = await eventService.create(eventPayload);

        // TODO: If the event has enable remember then call service to manage google calendar o service calendar,
        // else only create event without appointment event in service calendar
        if (!savedEvent.remember) return savedEvent;

        return savedEvent; //for test
    }
}
