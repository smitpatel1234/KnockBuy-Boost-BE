import { EntityManager } from "typeorm";
import { UserAndCredentialsRepoPort}  from "../../../application/port/User-repo.port";
import { UserProfile } from "../../../domain/models/User.models";


export const update_user = async (entitiesmanager: EntityManager, userRepo: UserAndCredentialsRepoPort, userProfile: UserProfile): Promise<boolean> => {
    const userCredentials = { 
        username: userProfile.username,
        email: userProfile.email,
        phone_number: userProfile.phone_number
    }
     const user = await userRepo.checkUserExists(entitiesmanager, userCredentials, userProfile.user_id);
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
    return await userRepo.updateUser(entitiesmanager, userProfile);
};