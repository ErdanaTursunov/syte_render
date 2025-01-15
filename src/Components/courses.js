import React, { useEffect, useState } from 'react';
import { $host } from '../http/axios';
import '../App.css'; 


const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $host.get(`/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      
      <section className='course-videos'>
      <h1 style={{marginBottom:'10px'}}>Список курсов</h1>
      <div className="box-container">
        {courses.map(course => (
          <a key={course.id} className="box" href={`/course/${course.id}`}>
             {course.image && <img src={`${process.env.REACT_APP_BASE_URL}/images/${course.image}`} alt={course.title} />}
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </a>
        ))}
      </div>
      </section>
    </div>
  );
};

export default Courses;
