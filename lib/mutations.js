const { ObjectId } = require("bson")
const connectDb = require("./db")
const errorHandler = require("./errorHandler")
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
            errorHandler(e)
        }
        return newCourse
    },
    createPerson : async (root, {input})=>{
        let db
        let student
        
        try{
            db= await connectDb()
            student = await db.collection("students").insertOne(input)
            input._id = student.insertedId
        }catch(e){
            errorHandler(e)
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
                errorHandler(e)
            }
            return course
    },
    editPerson: async (root, { _id, input })=>{
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
                errorHandler(e)
            }
            return student
    },
    addPeople: async(root, { courseID, personID })=>{
        let db
        let person
        let course

        try{
            db= await connectDb()
            course = await db.collection("courses").findOne({
                _id:ObjectId(courseID)
            })
            person = await db.collection("students").findOne({
                _id: ObjectId(personID)
            })
            if(!course || !person) throw new Error("La persona o el curso no existe")

            await db.collection("courses").updateOne(
                {_id: ObjectId(courseID)},
                { $addToSet:{people: ObjectId(personID)}}
            )

        }catch(e){
            errorHandler(e)
        }
        return course
    }

}