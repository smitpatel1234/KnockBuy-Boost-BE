import { EntityManager } from "typeorm";
import Express from "express";
import { AddressRepoPort } from "../../../application/port/address-repo.port";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { update_address } from "../../../application/useCases/address";
export const updateAddressController = (AddressRepo: AddressRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    AddressRepo.wrapTransaction(async (t: EntityManager) => {
      {
          const data = req.body;
            const IsUpdated =  await update_address(t, AddressRepo, data);
            if(!IsUpdated) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,"addess Not Found");
          return successmessage(res, "address updated successfully");
      }
    });
};
