const { MongoClient, ServerApiVersion } = require('mongodb');

const user = process.env.mongodbuser;
const pw = process.env.mongodbpw;

const uri = `mongodb+srv://${user}:${pw}@foliomarkserverle.lpfzr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export const setTestDocument = () => {
  mongoClient.connect(async (err, client) => {
    const db = client.db('foliomark').collection('web');
    await db.insertOne({ name: 'test name', otherProp: 'super cool prop' });
    client.close();
  });
};
