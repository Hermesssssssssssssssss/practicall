import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
function App() {
const [students, setStudents] = useState([]);
const [name, setName] = useState("");
const [course, setCourse] = useState("");
const [age, setAge] = useState("");
const [editingId, setEditingId] = useState(null);
const getStudents = () => {
  axios
      .get(`${API}/students`)
      .then((response) => {
        setStudents(response.data);
      })
          .catch((error) => console.log(error));
      };
      useEffect(() => {
        getStudents();
      }, []);
      const addStudent = () => {
        if (!name.trim() || !course.trim() || !age || Number(age) <= 0) {
          alert("Complete all fields");
          return;
        }
        axios
          .post(`${API}/students`, {
          name: name,
          course: course,
          age: Number(age),
        })
        .then(() => {
          getStudents();
          setName("");
          setCourse("");
          setAge("");
        })
          .catch((error) => console.log(error));
      };
      const editStudent = (student) => {
        setName(student.name);
        setCourse(student.course);
        setAge(student.age);
        setEditingId(student._id);
      };
      const updateStudent = () => {
        if (!name.trim() || !course.trim() || !age || Number(age) <= 0) {
          alert("Complete all fields");
          return;
        }
        axios
          .put(`${API}/students/${editingId}`, {
            name: name,
            course: course,
            age: Number(age),
          })
          .then(() => {
            getStudents();
            setName("");
            setCourse("");
            setAge("");
            setEditingId(null);
          })
          .catch((error) => console.log(error));
      };
      const deletedStudent = (id) => {
        axios
          .delete(`${API}/students/${id}`)
          .then(() => {
            getStudents();
          })
          .catch((error) => console.log(error));
      };
      return (
      <div>
      <h1>Student Management System</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
          />
      <br/>
      <br/>
      <input
      placeholder="Course"
      value={course}
      onChange={(e) => setCourse(e.target.value)}
          />
      <br/>
      <br/>
      <input
      type="number"
      placeholder="Age"
      value={age}
      onChange={(e) => setAge(e.target.value)}
          />
       <br/>
        <br/>
       <button onClick={editingId ? updateStudent : addStudent}>
            {editingId ? "Update Student" : "Add Student"}
      </button>
      <h2>Students</h2>
          {students.map((student) => (
    <div key={student._id}>
    <p>Name: {student.name}</p>
    <p>Course: {student.course}</p>
    <p>Age: {student.age}</p>
    <button onClick={() => editStudent(student)}>
                Edit
  </button>
  <button onClick={() => deletedStudent(student._id)}>
            Delete
  </button>
  </div>
      ))}
  </div>
  );
  }
  export default App;