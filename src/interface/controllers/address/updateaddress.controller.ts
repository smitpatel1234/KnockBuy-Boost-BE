import Express from "express";
import { EntityManager } from "typeorm";

import { AddressRepoPort } from "../../../application/port/address-repo.port";
import { update_address } from "../../../application/useCases/address";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const updateAddressController = (AddressRepo: AddressRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    AddressRepo.wrapTransaction(async (t: EntityManager) => {
      {   
          const data = req.body;
            const IsUpdated =  await update_address(t, AddressRepo, data);
            if(!IsUpdated) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,"addess Not Found");
          successmessage(res, "address updated successfully"); return;
      }
    });
};
