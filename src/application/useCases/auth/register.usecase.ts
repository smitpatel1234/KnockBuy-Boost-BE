import { EntityManager } from "typeorm";
import { UserCredentials } from "../../../domain/models/User.models";
import { UserAndCredentialsRepoPort } from "../../port/User-repo.port";
import bcrypt from 'bcrypt'
import {Envvar} from '../../../infrastructure/orm/config/ormconfig';
export const registerUser = async (
    entitiesmanager: EntityManager,
    userCredentials: UserCredentials,
    userRepo: UserAndCredentialsRepoPort
) => {

        const user = await userRepo.checkUserExists(entitiesmanager, userCredentials);
        let error = [];

        if (user.username === userCredentials.username) {
           error.push('Username already exists')
        }
        if (user.email === userCredentials.email) {
            error.push('Email already exists');
        }
        if (user.phone_number === userCredentials.phone_number) {
           error.push('Phone number already exists');
        }
        if (error.length > 0) {
            throw new Error(error.join(', '));
        }
        userCredentials.password = await bcrypt.hash(userCredentials.password,Envvar.PassWordSalt);
        await userRepo.saveUser(entitiesmanager, userCredentials);
        
};

   