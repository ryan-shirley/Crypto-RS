const functions = require("firebase-functions")
const admin = require("firebase-admin")
const axios = require('axios')
const moment = require('moment')

admin.initializeApp()

const db = admin.firestore()

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
    const {
        email,
        displayName,
        uid
    } = userRecord

    return db
        .collection("Users")
        .doc(uid)
        .set({
            email,
            displayName
        })
        .catch(console.error)
}


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const getMinerEarnings = functions.region('europe-west2').pubsub.schedule('0 0 * * *').onRun(async (context) => {
    let ethAddress = functions.config().eth.address

    try {
        // Make a requests to ethermine
        let res = await axios.get(`https://api.ethermine.org/miner/${ethAddress}/payouts`),
            payments = res.data.data

        const now = moment()

        // Get all payouts same day
        let todaysPayouts = [ 0 ]
        payments.forEach(payment => {
            const paidOn = moment(new Date(payment.paidOn * 1000)),
                dif = now.diff(paidOn, 'days'),
                amount = convertToETH(payment.amount)

            // Payment today
            if(dif === 0) {
                todaysPayouts.push(amount)
            }

        })

        // Unpaid
        let resStat = await axios.get(`https://api.ethermine.org/miner/${ethAddress}/currentStats`),
        stats = resStat.data.data,
        { unpaid, reportedHashrate } = stats

        // Price
        let resPrice = await axios.get(`https://api.ethermine.org/poolStats`),
        { price } = resPrice.data.data
        price.eur = price.usd * 0.84

        let data = {
            unpaid: convertToETH(unpaid),
            reportedHashrate: convertHToMH(reportedHashrate),
            todaysPayouts: todaysPayouts.reduce((accumulator, currentValue) => accumulator + currentValue),
            today: now,
            price
        }

        // Notify Zapier
        axios.post(functions.config().zapier.webhook, data)

        return null;
    } catch (error) {
        console.error(error)
        return null;
    }
});


module.exports = {
    authOnCreate: functions.auth.user().onCreate(createProfile),
    getMinerEarnings
}

const convertToETH = (value) => {
    return Number((value / 1000000000000000000).toFixed(5))
}

const convertHToMH = (value) => {
    return Number((value / 1000000).toFixed(2))
}