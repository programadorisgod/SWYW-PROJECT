import { db } from '@src/db';
import { DIContainer } from './container';
import { TOKENS } from './tokens';
import { eventsTable, eventTypesTable } from '@src/db/schema';
import { BaseDao } from '@src/dao/base-dao';
import { NlpProcessor } from '@src/features/Events/services/nlp/nlp-processor';
import { EventRespository } from '@src/features/Events/repository/event';
import { EventMediator } from '@src/features/Events/mediator/event-mediator';
import { EventService } from '@src/features/Events/services/event/event';
import { EventController } from '@src/features/Events/controllers/event';
import type { AIModel } from '@src/share/utils/ai/interfaces/ai-model.interface';
import type { AIModels } from '@src/share/types/ai';
import { GeminiModelFactory } from '@src/share/utils/ai/factory/gemini-model-factory';
import type { AIModelFactory } from '@src/share/utils/ai/factory/ai-model-factory';
import { ProviderAIModel } from '@src/share/utils/ai/provider/provider-model-ai';
import { EventTypeRepository } from '@src/features/Events/repository/even-type';

export const initContainer = () => {
    const container = DIContainer.getInstance();
    const aiModelFactory: AIModelFactory = ProviderAIModel.create();
    const aiModel: AIModel = aiModelFactory.createAIModel();

    container.registerService(TOKENS.database, db);
    container.registerDAO(TOKENS.DAO, TOKENS.database, eventsTable, BaseDao);
    container.registerDAO(
        TOKENS.DAOEventsType,
        TOKENS.database,
        eventTypesTable,
        BaseDao
    );
    container.registerService(
        TOKENS.repositoryEventTypes,
        new EventTypeRepository()
    );
    container.registerService(TOKENS.repositoryEvents, new EventRespository());
    container.registerService(TOKENS.eventService, new EventService());
    container.registerService(TOKENS.aiModel, aiModel);
    container.registerService(TOKENS.nlp, new NlpProcessor());
    container.registerService(TOKENS.eventMediator, new EventMediator());
    container.registerService(TOKENS.eventController, new EventController());
};
