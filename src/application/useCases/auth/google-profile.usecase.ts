// export interface GoogleProfile {
//   _json?: any;
//   _raw?: string;
//   displayName: string;
//   emails?: { value: string; verified?: boolean }[];
//   id: string;
//   name?: {
//     familyName?: string;
//     givenName?: string;
//   };
//   photos?: { value: string }[];
//   provider?: string;
// }

// export const getGoogleProfileData = (googleProfile: GoogleProfile) => {
//   return {
//     allEmails: googleProfile.emails,
//     allPhotos: googleProfile.photos,
//     displayName: googleProfile.displayName,
//     email: googleProfile.emails?.[0]?.value,
//     familyName: googleProfile.name?.familyName,
//     givenName: googleProfile.name?.givenName,
//     googleId: googleProfile.id,
//     profilePhoto: googleProfile.photos?.[0]?.value,
//     provider: googleProfile.provider,
//     rawData: googleProfile._json,
//   };
// };
