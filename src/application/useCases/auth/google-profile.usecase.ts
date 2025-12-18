export interface GoogleProfile {
  id: string;
  displayName: string;
  name?: {
    familyName?: string;
    givenName?: string;
  };
  emails?: Array<{ value: string; verified?: boolean }>;
  photos?: Array<{ value: string }>;
  provider?: string;
  _raw?: string;
  _json?: any;
}

export const getGoogleProfileData = (googleProfile: GoogleProfile) => {
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
