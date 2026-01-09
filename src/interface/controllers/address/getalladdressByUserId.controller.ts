import Express from "express";
import { EntityManager } from "typeorm";

import { AddressRepoPort } from "../../../application/port/address-repo.port";
import { get_all_address_by_user_id } from "../../../application/useCases/address";
import { successmessage } from '../../../infrastructure/helper/displaymessage'
import { AuthRequest } from "../../types/request.types";

export const getALLAddressController = (AddressRepo: AddressRepoPort) => {
  return async (req: AuthRequest, res: Express.Response) =>
    AddressRepo.wrapTransaction(async (t: EntityManager) => {
      {
        const user_id = req.body.user.id;
        const data = await get_all_address_by_user_id(t, AddressRepo, user_id);
        successmessage(res, "Get all the addess successfully", data); return;
      }

    });
};
