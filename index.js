const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3700;


//middleware
const corsOption = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsOption))
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://stepware345:QloY1Z2DwtvcTRVU@cluster0.huqehxg.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://stepware345:QloY1Z2DwtvcTRVU@cluster0.huqehxg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const shoesCollection = client.db("setWarebd").collection("shoesCollection");

        //shoesCollection related apis
        app.get('/shoes', async (req, res) => {
            const result = await shoesCollection.find().toArray();
            res.send(result)
        })































        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Welcome to StepWare-Server')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})