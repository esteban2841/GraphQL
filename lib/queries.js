const connectDb = require("./db")
const errorHandler = require("./errorHandler")
const {ObjectId}= require("mongodb")
module.exports= {
    getCourses: async ()=> {
        let db
        let courses = []
        try{
            db = await connectDb()
            courses = await db.collection("courses").find().toArray()
        }catch(e){
            errorHandler(e)
        }
        return courses
    },
    getCourse: async (root, {id}) => {
        let db
        let course
        try{
            db = await connectDb()
            course = await db.collection("courses").findOne({_id: ObjectId(id)})
        }catch(e){
            errorHandler(e)
        }
        return course
    },
    getPeople: async ()=> {
        let db
        let students = []
        try{
            db = await connectDb()
            students = await db.collection("students").find().toArray()
        }catch(e){
            errorHandler(e)
        }
        return students
    },
    getPerson: async (root, {id}) => {
        let db
        let student
        try{
            db = await connectDb()
            student = await db.collection("students").findOne({_id: ObjectId(id)})
        }catch(e){
            errorHandler(e)
        }
        return student
    }
}