const {MongoClient} = require("mongodb")
const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME
}=process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.k4mio3i.mongodb.net/?retryWrites=true&w=majority`
let connection

async function main(){
    if(connection) return connection
    const connectionUri = mongoUrl
    const client = new MongoClient(connectionUri, { useNewUrlParser: true, useUnifiedTopology: true })
    try{
        await client.connect()
        connection = client.db(DB_NAME)

    }catch(e){
        console.error(e)
    }
    return connection
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = main