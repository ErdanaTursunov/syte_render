import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { $host, $authHost } from '../http/axios';
import '../App.css'; 

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот курс?')) {
      try {
        await $authHost.delete(`/course/${id}`);
        alert('Курс успешно удален');
        setCourses(courses.filter(course => course.id !== id));
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Ошибка при удалении курса');
      }
    }
  };

  return (
    <div>
      <section className='course-videos'>
        <h1 style={{marginBottom:'10px'}}>Список курсов</h1>
        <div className="box-container">
          {courses.map(course => (
            <div key={course.id} className="box">
              <a href={`/admin/course/${course.id}`}>
                {course.image && <img src={`${process.env.REACT_APP_BASE_URL}/images/${course.image}`} alt={course.title} />}
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </a>
              <button onClick={() => handleDelete(course.id)} className="delete-button">Удалить</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Courses;
