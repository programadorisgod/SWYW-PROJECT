import type { BaseDao } from '@src/dao/base-dao';
import type { AnyTable } from '@src/share/types/database';

export class DIContainer {
    private static instance: DIContainer;
    private services: Map<symbol, any> = new Map();

    private constructor() {}

    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer();
        }
        return DIContainer.instance;
    }

    public registerService<T>(key: symbol, service: T): void {
        this.services.set(key, service);
    }

    public registerDAO<T, E>(
        keyDao: symbol,
        keyDatabase: symbol,
        table: AnyTable,
        DaoClass: typeof BaseDao
    ) {
        const db = this.resolve(keyDatabase);
        this.services.set(keyDao, new DaoClass(table, db, 'id'));
    }

    public resolve<T>(key: symbol): T {
        const service = this.services.get(key) as T;
        if (!service) throw new Error(`Service not found: ${key.description}`);
        return service;
    }
}
