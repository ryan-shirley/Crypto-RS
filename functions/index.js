const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()

const db = admin.firestore()

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
    const { displayName, uid } = userRecord

    return db
        .collection("Users")
        .doc(uid)
        .set({ email, displayName })
        .catch(console.error)
}

module.exports = {
    authOnCreate: functions.auth.user().onCreate(createProfile),
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
