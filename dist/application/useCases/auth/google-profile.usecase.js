"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleProfileData = void 0;
const getGoogleProfileData = (googleProfile) => {
    return {
        googleId: googleProfile.id,
        displayName: googleProfile.displayName,
        email: googleProfile.emails?.[0]?.value,
        profilePhoto: googleProfile.photos?.[0]?.value,
        givenName: googleProfile.name?.givenName,
        familyName: googleProfile.name?.familyName,
        allEmails: googleProfile.emails,
        allPhotos: googleProfile.photos,
        provider: googleProfile.provider,
        rawData: googleProfile._json,
    };
};
exports.getGoogleProfileData = getGoogleProfileData;
