import { EntityManager } from "typeorm";

import { PaginationResponse, searchPageParams } from "../../../domain/globalTypes/commonFields";
import { GetItemModel, VariantForOneItem } from "../../../domain/models/item.models";
import { ItemRepoPort } from "../../port/item-repo.port";

export const search_items = async (
    em: EntityManager,
    data: searchPageParams,
    itemRepo: ItemRepoPort
): Promise<PaginationResponse<Partial<GetItemModel>>> => {
     
    const result = await itemRepo.searchItems(em, data);
    
    const itemsMap = new Map<string, Partial<GetItemModel> & { variant: VariantForOneItem[] }>();
     
    (result.data as GetItemModel[]).forEach((row: GetItemModel) => {
        if (row.item_id && !itemsMap.has(row.item_id)) {
            itemsMap.set(row.item_id, {
                category_id: row.category_id,
                category_name: row.category_name,
                description: row.description,
                image_url: row.image_url,
                item_id: row.item_id,
                item_name: row.item_name,
                item_price: row.item_price,
                rating: row.rating,
                sku: row.sku,
                slug: row.slug,
                stock: row.stock,
                variant: []
            });
        }
    });
    
    return {
        ...result,
        data: Array.from(itemsMap.values())
    };
};
