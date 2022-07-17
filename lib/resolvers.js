
const courses = [
    {
        _id: "1",
        title: "mi titulo",
        teacher: "profesor",
        description: "una description",
        topic: "tema"
    },
    {
        _id: "2",
        title: "mi titulo 2",
        teacher: "profesor",
        description: "una description",
        topic: "tema"
    },
    {
        _id: "3",
        title: "mi titulo 3",
        teacher: "profesor",
        description: "una description",
        topic: "tema"
    }
]
module.exports = { 
    Query: {
        getCourses: ()=> courses
    }
}