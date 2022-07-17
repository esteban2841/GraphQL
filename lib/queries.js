const connectDb = require("./db")

module.exports= {
    getCourses: async ()=> {
        let db
        let courses = []
        try{
            db = await connectDb()
            courses = await db.collection("courses").find().toArray()
        }catch(e){
            console.error(e)
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
            console.error(e)
        }
        return course
    }
}