export interface WishlistItem {
  category_id: string;

  category_name?: string;
  description: string;
  image_url?: string;

  item_id: string;
  item_name: string;

  item_price: number;
  rating?: number;
  sku?: string;

  slug?: string;
  stock: number;

  wish_list_id: string;
}
