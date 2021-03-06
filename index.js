const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hvuwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("glass_shop");
    const glassCollection = database.collection("glassProducts");
    const exploreCollection = database.collection("glassExplore");
    const buyersInfoCollection = database.collection("buyerInfo");

    app.post("/buyersInfo", async (req, res) => {
      // const buyerInfo = req.body;
      // console.log(buyerInfo);
      // const result = await buyersInfoCollection.insertOne(buyersInfo);
      // res.json(result);
    });

    // GET services API :
    app.get("/exploreglass", async (req, res) => {
      const cursor = exploreCollection.find({});
      const exploreglass = await cursor.toArray();
      res.send(exploreglass);
    });
    // GET services API :
    app.get("/products", async (req, res) => {
      const cursor = glassCollection.find({});
      const products = await cursor.toArray();
      res.send(products);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello,Sunglass Users");
});

app.listen(port, () => {
  console.log(`Runing Server:${port}`);
});
