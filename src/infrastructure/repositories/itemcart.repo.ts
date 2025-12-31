import { EntityManager } from "typeorm";
import { ItemCart } from "../orm/entities/item_cart";
import { ItemCartRepoPort } from "../../application/port/itemcart-repo.port";
import { wrapTransaction } from "../helper/transaction";
import {
  ItemCartType,
  ItemCartUpdateType,
  ItemCartDeleteType,
  AddItemCartType,
} from "../../domain/models/itemcart.models";
export const ItemCartRepo: ItemCartRepoPort = {
  getAllItemCartEntry: async (em: EntityManager, user_id: string) => {
    const q = em.getRepository(ItemCart).createQueryBuilder("itemcart");
    q.where("itemcart.user = :user_id", { user_id });
    q.leftJoin("itemcart.item", "item").select([
      "itemcart.cart_item_id",
      "itemcart.quantity",
      "item.item_name",
      "item.item_price",
      "item.stock",
    ]);
    return q.getRawMany();
  },
  updateItemCartEntry: async (em: EntityManager, data: ItemCartUpdateType) => {
    if (data.quantity == 0) {
      const result = await em.getRepository(ItemCart).delete(data.cart_item_id);
      return (result.affected ?? 0) > 0;
    }
    if (data.quantity > 0) {
      const result = await em
        .getRepository(ItemCart)
        .update(data.cart_item_id, { quantity: data.quantity });
      return (result.affected ?? 0) > 0;
    }
    return false;
  },

  deleteItemCartEntry: async (em: EntityManager, data: ItemCartDeleteType) => {
    const result = await em.getRepository(ItemCart).delete(data.cart_item_id);
    return (result.affected ?? 0) > 0;
  },
  crateItemCartEntry: async (em: EntityManager, data: AddItemCartType) => {
      const cart_item = em.create(ItemCart, {
      item: data.item,
      user: data.user,
      quantity: data.quantity,
    });
      const result = await em.getRepository(ItemCart).save(cart_item);
      return !!result;
  },
  wrapTransaction: wrapTransaction,
};
