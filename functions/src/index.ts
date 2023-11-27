/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";

import admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth.user().onCreate((user) => {
  db.collection("users")
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});

export const createFacility = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be authenticated to create a user profile."
    );
  }

  if (!data) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Facility data is invalid. Please provide it"
    );
  }
  admin.firestore().collection("facilities").add({
    name: data.name,
    category: data.category,
    sku: data.sku,
    imageUrl: data.imageUrl,
  });

  return { message: "Facility profile created successfully." };
});

// export const getFacilities = functions.https.onCall(async (data, context) => {
//   if (!context.auth) {
//     throw new functions.https.HttpsError(
//       "unauthenticated",
//       "You must be authenticated to create a user profile."
//     );
//   }

//   const facilityData = data;
//   if (!facilityData) {
//     throw new functions.https.HttpsError(
//       "invalid-argument",
//       "Facility data is invalid. Please provide it"
//     );
//   }

//   const userRef = admin
//     .firestore()
//     .collection("facilities")
//     .doc("customFacilityID");
//   await userRef.set(facilityData);

//   return { message: "Facility profile created successfully." };
// });
