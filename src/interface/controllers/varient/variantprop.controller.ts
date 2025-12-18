import { EntityManager } from "typeorm";
import  Express  from "express";
import { constants } from "../../../infrastructure/config/constants";
import { displaymessage } from "../../../infrastructure/helper/displaymessage";
import {
  create_varient_property,
  update_varient_property,
  delete_varient_property,
  getall_variant_properties
} from "../../../application/useCases/variant/variant_prop_usecase";
import { VariantRepoPort } from "../../../application/port/variant-repo.port";
import { UUID } from "crypto";
import e from "express";

export const createVariantPropController = (variantRepo: VariantRepoPort) => {
  return async (
    req: Express.Request,
    res: Express.Response
  ) => variantRepo.wrapTransaction(async (t:EntityManager)=>{
        const data = req.body;
        await create_varient_property(t,variantRepo,data).then(()=>{
            displaymessage(constants.Code.CREATED, res);
        }).catch((err)=>{
            displaymessage(constants.Code.INTERNAL_SERVER_ERROR, res,[err]);
        });

  });
    
};
export const UpdateVariantPropController = (variantRepo: VariantRepoPort) => {
  return async (
    req: Express.Request,
    res: Express.Response
  ) => variantRepo.wrapTransaction(async (t:EntityManager)=>{
        const data = req.body;
        await update_varient_property(t,variantRepo,data).then(()=>{
            displaymessage(constants.Code.CREATED, res);
        }).catch((err)=>{
            displaymessage(constants.Code.INTERNAL_SERVER_ERROR, res,[err]);
        });

  });
    
};
export const deleteVariantPropController = (variantRepo: VariantRepoPort) => {
  return async (
    req: Express.Request,
    res: Express.Response
  ) => variantRepo.wrapTransaction(async (t:EntityManager)=>{
        const data = req.body;
        await delete_varient_property(t,variantRepo,data).then(()=>{
            displaymessage(constants.Code.CREATED, res);
        }).catch((err)=>{
            displaymessage(constants.Code.INTERNAL_SERVER_ERROR, res,[err]);
        });

  });
    
};
export const getAllVariantPropertiesController =(variantRepo: VariantRepoPort) => {
  return async (
    req: Express.Request,
    res: Express.Response
  ) => variantRepo.wrapTransaction(async (t:EntityManager)=>{
        const data =  await getall_variant_properties(t,variantRepo).then((data)=>{
            displaymessage(constants.Code.OK, res,data);
        }).catch((err)=>{
            displaymessage(constants.Code.INTERNAL_SERVER_ERROR, res,[err]);
        });

  });
    
};
