import Express from "express";
import { EntityManager } from "typeorm";

import { AddressRepoPort } from "../../../application/port/address-repo.port";
import { create_address  } from "../../../application/useCases/address/index";
import { Address } from "../../../domain/models/address.models";
import {successmessage} from '../../../infrastructure/helper/displaymessage'

export const createAddressController = (AddressRepo: AddressRepoPort) => {
  return async (req: Express.Request, res: Express.Response) =>
    AddressRepo.wrapTransaction(async (t: EntityManager) => {
      {  
        let user_id: string;
        if(req.params.id){
              user_id = req.params.id;
         }
         else{
              user_id = req.body.user.id as string;
         }
        
        const address = req.body as Address; 
        const data = {  user_id,...address };
        await create_address(t, AddressRepo,data);
        successmessage(res, "address created successfully"); return;
      }
    });
};
