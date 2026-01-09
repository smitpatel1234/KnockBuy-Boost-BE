import Express from "express";
import { EntityManager } from "typeorm";

import { AddressRepoPort } from "../../../application/port/address-repo.port";
import { create_address } from "../../../application/useCases/address/index";
import { Address } from "../../../domain/models/address.models";
import { successmessage } from '../../../infrastructure/helper/displaymessage'
import { AuthRequest } from "../../types/request.types";

export const createAddressController = (AddressRepo: AddressRepoPort) => {
  return async (req: AuthRequest<Address>, res: Express.Response) =>
    AddressRepo.wrapTransaction(async (t: EntityManager) => {
      {
        let user_id: string;
        if (req.params.id) {
          user_id = req.params.id;
        }
        else {
          user_id = req.body.user.id;
        }
        const address = req.body;
        const data = { user_id, ...address };
        await create_address(t, AddressRepo, data);
        successmessage(res, "address created successfully"); return;
      }
    });
};
