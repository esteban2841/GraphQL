const { graphql, buildSchema } = require("graphql")
const express = require("express")
const {graphqlHTTP}= require("express-graphql")
const {readFileSync} = require("fs")
const {join} = require("path")
const resolvers = require("./lib/resolvers")

const app = express()
const port = process.env.port || 3000

//define schema
const schema = buildSchema(
    readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
))


let source = '{ saludo }';

//configurar resolvers


app.use("/api", graphqlHTTP({
    schema : schema,
    rootValue : resolvers,
    graphiql: true, 
}))

app.listen(port, ()=>{
    console.log("server listening at port " + port)
})