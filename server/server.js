const express = require ("express");
const cors = require("cors");
const mongoose = require("mongoose");
const student = require("./models/student");
require("dotenv").config();

const app = express ();
app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to MongoDB");
})
.catch((error) =>{

    console.log("MongoDB connection error:", error);
});

app .get("/", (req, res) =>{
    res.send("Server is running!");

});

app.get("/students", async (req, res) =>{
    const students = await student.find();
    res.json(students);
});

//add
app.post("/students", async (req, res) => {
    const newStudent = new student ({

        name:req.body.name,
        course: req.body.course,
        age:req.body.age,

    })
    const saved = await newStudent.save();
    res.json(saved);
})

//delete

app.delete("/students/:id", async (req, res) => {
     await student.findByIdAndDelete(req.params.id);

     res.json({message:"student deleted"})

})

//edit

app.put("/students/:id", async (req,res) => {
try { 
    const {name, course, age} = req.body;
    const updatedStudent = await student.findByIdAndUpdate(
        req.params.id,
        {name,course,age},
        {new: true}
      
    );

       res.json(updatedStudent);

} catch (error) {
    res.status(500).json({message: error.message})
}

});

if (require.main === module) {
 app.listen(5000, () => {
   console.log("Server running on port 5000");
 });
}
module.exports = app;


