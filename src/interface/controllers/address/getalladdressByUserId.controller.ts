import { EntityManager } from "typeorm";
import Express from "express";
import { AddressRepoPort } from "../../../application/port/address-repo.port";
import {successmessage} from '../../../infrastructure/helper/displaymessage'
import { get_all_address_by_user_id } from "../../../application/useCases/address";
import { ApplicationError, ApplicationErrorType } from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
export const getALLAddressController = (AddressRepo: AddressRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    AddressRepo.wrapTransaction(async (t: EntityManager) => {
      {
          const user_id = req.body.user.id as string;
          if(!user_id) throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED,"Unauthorized User"); 
          const data = await get_all_address_by_user_id(t, AddressRepo, user_id);
          return successmessage(res,"Get all the addess successfully",data);
      }

    });
};
