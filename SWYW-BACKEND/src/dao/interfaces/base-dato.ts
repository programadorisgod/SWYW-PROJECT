import type { SQL } from 'drizzle-orm';

export interface IBaseDao<T, E> {
    findById(id: string): Promise<E | null>;
    findAll(limit: number, offset: number): Promise<E[] | []>;
    insert(data: T): Promise<E>;
    update(id: string, data: T): Promise<void>;
    delete(id: string): Promise<void>;
    findWhere(condition: SQL): Promise<T[]>;
    count(): Promise<number>;
}
