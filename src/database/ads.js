// this is basically like routes.js except for the in memory mongo db

const {getDatabase} = require('./mongo')
const collectionNames = 'ads'

async function insertAd(ad) {
    const database = await getDatabase()
        const {insertedId} = await database.collection(collectionNames).insertOne(ad)
        return insertedId
}

async function getAds() {
    const database = await getDatabase()
    return await database.collection(collectionNames).find({}).toArray()

}

module.exports = {
    insertAd,
    getAds
}