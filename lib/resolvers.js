

const { ObjectId } = require("mongodb")
const mutations = require("./mutations")
const queries = require("./queries")
module.exports = { 
    Query: queries,
    Mutation: mutations
}