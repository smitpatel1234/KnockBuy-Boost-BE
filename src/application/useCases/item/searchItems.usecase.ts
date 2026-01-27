/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call */
import { EntityManager } from "typeorm";

import { PaginationResponse, searchPageParams } from "../../../domain/globalTypes/commonFields";
import { GetItemModel } from "../../../domain/models/item.models";
import { ItemRepoPort } from "../../port/item-repo.port";

export const search_items = async (
    em: EntityManager,
    data: searchPageParams,
    itemRepo: ItemRepoPort
): Promise<PaginationResponse<Partial<GetItemModel>>> => {
     
    const result = await itemRepo.searchItems(em, data);
    
    // Group variants by item
    const itemsMap = new Map<string, any>();
    
    result.data.forEach((row: any) => {
        if (!itemsMap.has(row.item_id)) {
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
        
        // Add variant if it exists
        if (row.variantValue_id && row.variant_value && row.property_name) {
            const item = itemsMap.get(row.item_id);
            const variantExists = item.variant.some((v: any) => v.variantValue_id === row.variantValue_id);
            if (!variantExists) {
                item.variant.push({
                    property_name: row.property_name,
                    variant_value: row.variant_value,
                    variantValue_id: row.variantValue_id
                });
            }
        }
    });
    
    return {
        ...result,
        data: Array.from(itemsMap.values())
    };
};
