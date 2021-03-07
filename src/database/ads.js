// this is basically like routes.js except for the in memory mongo db

const {getDatabase} = require('./mongo')
const collectionNames = 'ads'
const {objectID, ObjectID} = require('mongodb')



async function insertAd(ad) { // takes an add key value and inserts it into the database
    const database = await getDatabase()
        const {insertedId} = await database.collection(collectionNames).insertOne(ad) // inserts the new ad into the db
        return insertedId // returns the associated id with the new db entry
}

async function getAds() { // this gets the add from the DB, all of thems
    const database = await getDatabase()
    return await database.collection(collectionNames).find({}).toArray()

}

async function deleteAd(id) {
    const database = await getDatabase()
    await database.collection(collectionNames).deleteOne({_id: new ObjectID(id),})
}

async function updateAd(id, ad) {
    const database = await getDatabase();
    delete ad._id;
    await database.collection(collectionName).update(
      { _id: new ObjectID(id), },
      {
        $set: {
          ...ad,
        },
      },
    );
  }

module.exports = {
    insertAd,
    getAds,
    deleteAd,
    updateAd
}