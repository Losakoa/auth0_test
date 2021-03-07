const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds} = require('./database/ads');
const {deleteAd, updateAd } = require('./database/ads')

// defining the express app

const app = express()

//defining an array to work as the database (temp solution)
const ads = [
    {'title': 'Hello, world'}
]

//adding Helmet to exchance your API's security
app.use(helmet())
//using bodyParser to parse JSON bodyies into JS objects
app.use(bodyParser.json())
// adding cors for all reuqests and morgan to log http requests
app.use(cors())
app.use(morgan('combined'))

//define an endpoint
app.get('/', async (req, res) => {
    res.send(await getAds());
  })

app.post('/', async (req,res) => {
    const newAd = req.body
    await insertAd(newAd)
    res.send({message: 'New ad inserted.'})

})

app.post('/:id', async (req, res) => {
    await deleteAd(req.params.id)
    res.send({ message: 'Ad removed.' })
})

// update an ad via the id 
app.put('/:id', async (req, res) => {
    const updatedAd = req.body;
    await updateAd(req.params.id, updatedAd);
    res.send({ message: 'Ad updated.' });
});


startDatabase().then(async () => {
    await insertAd({title: 'Hello, now from the in-memory database!'})

// start the server
    port = 3002
    app.listen(port, () =>{
        console.log('listening on port 3002')
    })
})