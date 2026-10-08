import {useEffect, useState} from "react";
import axios from "axios";
import './App.css'



function App() {
const [students, setStudents] = useState([]);
const [name, setName]= useState("");
const [course, setCourse] = useState("");
const [age, setAge]= useState("");
const [editingId, setEditingId] = useState(null);


  useEffect(() => {

    axios
    .get("http://localhost:5000/students")
    .then((response) => {
      setStudents(response.data);
    });

  },[]);

  const addStudent = async ()=>(

    axios.post("http://localhost:5000/students", {
    name: name,
    course: course,
    age: age,

    })
    .then((response) =>{
      setStudents ([students, response.data])
      setName("");
      setCourse("");
      setAge("");
    })

  )

  const editStudent =(student) =>{
   setName(student.name);
   setCourse(student.course);
   setAge(student.age);
   setEditingId(student._id);


  };
  const updateStudent =()=>{
  axios
  .put(`http://localhost:5000/students/${editingId}`,{
   name:name,
   course: course,
   age:age,
  })
  .then(()=> {

    axios.get("http://localhost:5000/students")
    .then((res) => {
      setStudents(res.data);
    });

    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
  });

  };

  const deletedStudent =(id) =>{

    axios
    .delete(`http://localhost:5000/students/${id}`)
    .then(() =>{

      axios
      .get("http://localhost:5000/students")
      .then((res) =>{
        setStudents(res.data);
      })
    })
  }

  
  return (
<div>
  <h1>student Management System</h1>

<input placeholder="Name" value ={name} onChange={(e) => setName(e.target.value)}/>
<br>
</br>
<input placeholder="Course" value ={course} onChange={(e) => setCourse(e.target.value)}/>
<br></br>
<input type ="number" placeholder="Age" value ={age} onChange={(e) => setAge(e.target.value)}/>
<br></br>
<button onClick ={editingId ? updateStudent : addStudent}>{editingId? "Update Student" : "Add Student"}</button>

<h2>Students</h2>

{students.map((student) => (
  <div key = {student.id}>
    <p>Name: {student.name}</p>
    <p>Course: {student.course}</p>
    <p>Age: {student.age}</p>
    <button onClick ={()=> editStudent(student)}> edit</button>
     <button onClick={() => deletedStudent(student._id)}> delete</button>
    </div>
))}


</div>
  )

}

export default App;