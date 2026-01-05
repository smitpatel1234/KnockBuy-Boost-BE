import Express from "express";
import { EntityManager } from "typeorm";

import { AddressRepoPort } from "../../../application/port/address-repo.port";
import { delete_address } from "../../../application/useCases/address";
import {successmessage} from '../../../infrastructure/helper/displaymessage'
import { ApplicationError,ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";


export const deleteAddressController = (AddressRepo: AddressRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    AddressRepo.wrapTransaction(async (t: EntityManager) => {
      {
          const address_id = req.body.address_id;
         const IsDeleted =  await delete_address(t, AddressRepo, address_id );    
         if(!IsDeleted) throw new ApplicationError(ApplicationErrorType.NOT_FOUND,"addess Not Found");``
          successmessage(res, "addess deleted successfully"); return;   
      }
    });
};
