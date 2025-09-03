import type { eventsTable } from '@src/db/schema';
import type { IBaseDao } from './interfaces/base-dato';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import { eq, type SQL } from 'drizzle-orm';
import type { AnyTable } from '@src/share/types/database';

export class BaseDao<T, E> implements IBaseDao<T, E> {
    constructor(
        private readonly table: AnyTable,
        private readonly db: any,
        private readonly idField: string
    ) {}

    async findById(id: string): Promise<E | null> {
        const column = (this.table as any)[this.idField] as AnyPgColumn;
        const [result] = await this.db
            .select()
            .from(this.table)
            .where(eq(column, id));
        return (result as E) || null;
    }
    async findWhere(condition: SQL): Promise<T[]> {
        const results = await this.db
            .select()
            .from(this.table)
            .where(condition);

        return results as T[];
    }

    async findByField<K extends keyof T>(
        field: K,
        value: T[K]
    ): Promise<E | null> {
        const results = await this.db
            .select()
            .from(this.table)
            .where(eq((this.table as any)[field], value));
        return (results as E) || null;
    }
    async findAll(): Promise<E[] | null> {
        const results = await this.db.select().from(this.table);
        return (results as E[]) || null;
    }
    async insert(entity: T): Promise<E> {
        const [result] = await this.db
            .insert(this.table)
            .values(entity as any)
            .returning();
        return result as E;
    }
    async update(id: string, data: T): Promise<void> {
        await this.db
            .update(this.table)
            .set(data)
            .where(eq((this.table as any)[this.idField], id));
    }
    async delete(id: string): Promise<void> {
        await this.db
            .delete(this.table)
            .where(eq((this.table as any)[this.idField], id));
    }
}
