import { EntityManager } from "typeorm";
import Express from "express";
import { AddressRepoPort } from "../../../application/port/address-repo.port";
import { create_address  } from "../../../application/useCases/address/index";
import {successmessage} from '../../../infrastructure/helper/displaymessage'
import { Address } from "../../../domain/models/address.models";

export const createAddressController = (AddressRepo: AddressRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    AddressRepo.wrapTransaction(async (t: EntityManager) => {
      {
        const user_id = req.body.user.id as string;
        const address = req.body as Address; 
        const data = {  user_id,...address };
        await create_address(t, AddressRepo,data);
        return successmessage(res, "address created successfully");
      }
    });
};
