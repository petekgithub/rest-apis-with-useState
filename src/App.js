// REST API
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL : "http://localhost:3100/posts",
});

let idNum = 5;
function App() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getsubjects();
  },[]);

    const getsubjects = async () => {
        try {
          let dataValue = await api.get('/').then(({data}) => data );
          setSubjects(dataValue);
          console.log(dataValue);
        } catch(err) {
            console.log(err);
        }
    };

    const postsubjects = async () => {
     await api.post('/',
     {
        "id": idNum,
        "title": "Java"
     });
     getsubjects();
     idNum++;
   }

   const deleteCourse = async (id) => {
    await api.delete(`/${id}`)
    getsubjects();
  }

  const updateCourse = async (id, val) => {
    await api.patch(`/${id}`, {title:val})
    getsubjects();
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={postsubjects}>Add Course</button>
        {subjects.map((course) => {
            return (
              <>
                <h2 key={course.id} onClick={() => updateCourse(course.id, `${course.title}1`)}>
                {course.title}
                <button onClick={() => deleteCourse(course.id)}>Delete Course</button>
                </h2>
              </>
            )
          })
        }
      </header>
    </div>

  );
}

export default App;
