export interface AddItemModel {
    category_id: string,
    description: string,
    images?: string[]

    item_name: string,
    item_price: number,
    rating?: number,
    sku?: string,
    stock: number,
    variant?: { variantProperty_id: string; variantValue_id: string }[]
    variant_collections?: { item_id: string; item_name: string, }[]
}
export interface GetItemModel extends AddItemModel {
    category_name: string,
    image_id?: string
    image_url?: string
    variant_info?: { property: string; value: string }[],
}
export interface ItemModel extends AddItemModel {
    category_name?: string
    item_id: string,
    slug: string

}

