import { EntityManager } from "typeorm";

import { ItemDescriptionRepoPort } from "../../port/item-description-repo.port";

export const updateItemDescription = async (
    em: EntityManager,
    itemId: string,
    data: {
        how_its_made?: string;
        how_to_use?: string;
        key_features?: Record<string, string>;
        specifications?: string[];
    },
    descRepo: ItemDescriptionRepoPort
) => {
    return await descRepo.upsertDescription(em, itemId, data);
};
