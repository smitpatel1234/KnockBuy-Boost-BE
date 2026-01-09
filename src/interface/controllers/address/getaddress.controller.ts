import Express from "express";
import { EntityManager } from "typeorm";

import { AddressRepoPort } from "../../../application/port/address-repo.port";
import { get_address } from "../../../application/useCases/address/getaddress.usecase";
import { successmessage } from "../../../infrastructure/helper/displaymessage";
import { AuthRequest } from "../../types/request.types";

export const getAddressController = (AddressRepo: AddressRepoPort) => {
  return async (req: AuthRequest<{ address_id: string }>, res: Express.Response) => {
    return AddressRepo.wrapTransaction(async (t: EntityManager) => {
      const address_id = req.body.address_id;
      const address = await get_address(t, AddressRepo, address_id);
      successmessage(res, "address is sucessfully fetched", address)
    });
  };
};
