"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserInGoogle = void 0;
const loginUserInGoogle = (entitiesmanager, AuthRepo, user) => {
    const email = user.emails[0].value;
    AuthRepo.FindUser(entitiesmanager, { identifier: "", password: "" }).then((user) => {
        console.log("User found", user);
    }).catch((err) => {
        console.log("Error finding user", err);
    });
};
exports.loginUserInGoogle = loginUserInGoogle;
