import { DIContainer } from '@src/container/container';
import { TOKENS } from '@src/container/tokens';
import { BaseDao } from '@src/dao/base-dao';
import type { eventType } from '../types/event';
import type { InferSelectModel } from 'drizzle-orm';
import { eventTypesTable } from '@src/db/schema';
import { sql } from 'drizzle-orm';

type EventTypeRecord = InferSelectModel<typeof eventTypesTable>;
export class EventTypeRepository {
    private readonly dao = DIContainer.getInstance().resolve<
        BaseDao<any, EventTypeRecord>
    >(TOKENS.DAOEventsType);

    getAllEventTypes = async (): Promise<EventTypeRecord[]> => {
        const eventTypes = await this.dao.findAll(100, 0);
        return eventTypes || [];
    };

    getEventTypeName = async (
        name: string
    ): Promise<EventTypeRecord | null> => {
        console.log('Searching for event type with name:', name);
        const eventType = await this.dao.findWhere(sql`name = ${name}`);
        return eventType[0] || null;
    };
}
