import { EntityManager } from "typeorm";

import { ItemCartRepoPort } from "../../application/port/itemcart-repo.port";
import {
  AddItemCartType,
  ItemCartDeleteType,
  ItemCartUpdateType,
} from "../../domain/models/itemcart.models";
import { wrapTransaction } from "../helper/transaction";
import { ItemCart } from "../orm/entities/item_cart";
import { ApplicationError ,ApplicationErrorType} from "../helper/middleware/GlobelErrorHandler"
import { ItemRepo } from "../repositories/item.repo"
export const ItemCartRepo: ItemCartRepoPort = {
  clearCartEntry: async (em: EntityManager, user_id: string) => {
    const result = await em.getRepository(ItemCart).delete({ user: { user_id } });
    return (result.affected ?? 0) > 0;
  },

  crateItemCartEntry: async (em: EntityManager, data: AddItemCartType) => {
    const exist = await em.getRepository(ItemCart).findOne({
      where: {
        item: { item_id: data.item },
        user: { user_id: data.user },
      },
    })
   
    if (exist) {
        const ISItemInStock = await ItemRepo.ISItemInStock(em,data.item,exist.quantity + data.quantity)
        if(!ISItemInStock){
            throw new ApplicationError(ApplicationErrorType.BAD_REQUEST,"stock is not availabel")
        }
      const result = await em
        .getRepository(ItemCart)
        .update(exist.cart_item_id, { quantity: exist.quantity + data.quantity });
      return (result.affected ?? 0) > 0;
    }
    const cart_item = em.create(ItemCart, {
      item: { item_id: data.item },
      quantity: data.quantity,
      user: { user_id: data.user },
    });

    const result = await em.getRepository(ItemCart).save(cart_item);
    return !!result;
  },

  deleteItemCartEntry: async (em: EntityManager, data: ItemCartDeleteType) => {
    const result = await em.getRepository(ItemCart).delete({ cart_item_id: data.cart_item_id });
    return (result.affected ?? 0) > 0;
  },

  getAllItemCartEntry: async (em: EntityManager, user_id: string) => {
    const q = em.getRepository(ItemCart).createQueryBuilder("itemcart").withDeleted();
    q.where("itemcart.user = :user_id", { user_id });
    q.leftJoin("itemcart.item", "item")
      .addSelect((subQuery) => {
        return subQuery
          .select("img.image_URL")
          .from("image", "img") 
          .where("img.items_id = item.item_id")
          .limit(1);
      }, "image_url")
      .select([
        "itemcart.cart_item_id as cart_item_id",
        "itemcart.user as user",
        "itemcart.item as item_id",
        "itemcart.quantity as quantity",
        "item.item_name as item_name",
        "item.item_price as item_price",
        "item.stock as stock",
        "item.deleted_at as deleted_at",
      ])
      .addSelect(subQuery => {
        return subQuery
          .select("img.image_URL", "image_url")
          .from("image", "img")
          .where("img.items_id = item.item_id")
          .limit(1);
      }, "image_url");

    return await q.getRawMany();
  },
  updateItemCartEntry: async (em: EntityManager, data: ItemCartUpdateType) => {
    if (data.quantity == 0) {
      const result = await em.getRepository(ItemCart).delete(data.cart_item_id);
      return (result.affected ?? 0) > 0;
    }
    if (data.quantity > 0 ) {
      const result = await em
        .getRepository(ItemCart)
        .update(data.cart_item_id, { quantity: data.quantity });
      return (result.affected ?? 0) > 0;
    }
    return false;
  },
  wrapTransaction: wrapTransaction,
};
