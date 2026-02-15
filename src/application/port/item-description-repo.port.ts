import { EntityManager } from "typeorm";

import { ItemDescription } from "../../infrastructure/orm/entities/item_description";

export interface ItemDescriptionRepoPort {
    getDescriptionByItemId(
        em: EntityManager,
        itemId: string
    ): Promise<ItemDescription | null>;
    upsertDescription(
        em: EntityManager,
        itemId: string,
        data: Partial<ItemDescription>
    ): Promise<ItemDescription>;
    wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
}
