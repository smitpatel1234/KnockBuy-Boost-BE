import { EntityManager } from "typeorm";

import { ItemDescriptionRepoPort } from "../../application/port/item-description-repo.port";
import { wrapTransaction } from "../helper/transaction";
import { ItemDescription } from "../orm/entities/item_description";

export const ItemDescriptionRepo: ItemDescriptionRepoPort = {
    getDescriptionByItemId: async (
        em: EntityManager,
        itemId: string
    ): Promise<ItemDescription | null> => {
        return await em.findOne(ItemDescription, { where: { item_id: itemId } });
    },

    upsertDescription: async (
        em: EntityManager,
        itemId: string,
        data: Partial<ItemDescription>
    ): Promise<ItemDescription> => {
        let description = await em.findOne(ItemDescription, { where: { item_id: itemId } });

        if (description) {
            em.merge(ItemDescription, description, data);
        } else {
            description = em.create(ItemDescription, { ...data, item_id: itemId });
        }

        return await em.save(ItemDescription, description);
    },

    wrapTransaction: wrapTransaction,
};
