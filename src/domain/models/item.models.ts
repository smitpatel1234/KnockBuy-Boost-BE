export interface AddItemModel {
    item_name: string,
    item_price: number,
    category_id: string,

    rating?: number,
    sku?: string,
    stock: number,
    description: string,
    variant?: { variantProperty_id: string; variantValue_id: string }[]
    variant_collections?: string[]
}
export interface ItemModel extends AddItemModel {
    item_id: string,
    slug: string
    category_name?: string

}
export interface GetItemModel extends AddItemModel {
    category_name: string,
    variant_info?: { property: string; value: string }[]
}

