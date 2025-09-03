import type { SQL } from 'drizzle-orm';

export interface IBaseDao<T, E> {
    findById(id: string): Promise<E | null>;
    findAll(): Promise<E[] | null>;
    insert(data: T): Promise<E>;
    update(id: string, data: T): Promise<void>;
    delete(id: string): Promise<void>;
    findWhere(condition: SQL): Promise<T[]>;
}
