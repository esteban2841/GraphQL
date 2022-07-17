const { ObjectId } = require("bson")
const connectDb = require("./db")

module.exports ={
    createCourse : async (root, {input})=>{
        const defaults= {
            teacher: "",
            topic: ""
        }
        let db
        let course
        const newCourse = Object.assign(defaults, input)
        try{
            db= await connectDb()
            course = await db.collection("courses").insertOne(newCourse)
            newCourse._id = course.insertedId
        }catch(e){
            console.error(e)
        }
        return newCourse
    },
    createStudent : async (root, {input})=>{
        let db
        let student
        
        try{
            db= await connectDb()
            student = await db.collection("students").insertOne(input)
            input._id = student.insertedId
        }catch(e){
            console.error(e)
        }
        return input
    },
    editCourse: async (root, { _id, input })=>{
            let db
            let course
            try{
                db= await connectDb()
                course = await db.collection("courses").updateOne(
                    { _id: ObjectId(_id)},
                    { $set: input }
                )
                course = await db.collection("courses").findOne({_id: ObjectId(_id)})
            }catch(e){
                console.error(e)
            }
            return course
    },
    editStudent: async (root, { _id, input })=>{
            let db
            let student
            try{
                db= await connectDb()
                student = await db.collection("students").updateOne(
                    { _id: ObjectId(_id)},
                    { $set: input }
                )
                student = await db.collection("students").findOne({_id: ObjectId(_id)})
            }catch(e){
                console.error(e)
            }
            return student
    }
}