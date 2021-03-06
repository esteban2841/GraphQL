
const connectDb = require("./db")
const { ObjectId } = require("mongodb")
const errorHandler = require("./errorHandler")
module.exports = {
    Course: {
        people: async({people})=>{
            let db
            let peopleData
            let ids
            try{
                db = await connectDb()
                ids = people ? people.map(id=> ObjectId(id)):[]
                console.log(ids)
                peopleData = ids.length > 0 
                ? await db.collection("students").find(
                    { _id : {$in:ids}}
                ).toArray()
                : []
            }catch(e){
                errorHandler(e)
            }
            return peopleData
        }
    },
    Person:{
        __resolveType: (person, context, info)=>{
            if(person.phone){
                return "Monitor"
            }
            return "Student"
        }
    }
}
