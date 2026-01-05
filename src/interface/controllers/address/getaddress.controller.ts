import Express from "express";
import { EntityManager } from "typeorm";

import { AddressRepoPort } from "../../../application/port/address-repo.port";
import { get_address } from "../../../application/useCases/address/getaddress.usecase";
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

export const getAddressController = (AddressRepo: AddressRepoPort) => {
  return async (req: Express.Request, res: Express.Response) => {
    return AddressRepo.wrapTransaction(async (t: EntityManager) => {
      const address_id = req.body.address_id as string;
      const address = await get_address(t, AddressRepo, address_id);
      if (!address) {
        throw new ApplicationError(ApplicationErrorType.NOT_FOUND,"address not found");
      }
    });
  };
};
