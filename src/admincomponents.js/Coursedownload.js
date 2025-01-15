import React, { useState } from 'react';
import { $authHost } from '../http/axios';
import Header from './Header';
import withAuth from './WithAuth';

const CourseDownload = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    maxDescription: '',
    image: null
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourseData({ ...courseData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', courseData.title);
      formData.append('description', courseData.description);
      formData.append('maxdescription', courseData.maxDescription);
      formData.append('image', courseData.image);

      const response = await $authHost.post('/courses/upload', formData);

      console.log(response.data);
      // Clear the form fields after successful upload
      setCourseData({
        title: '',
        description: '',
        maxDescription: '',
        image: null
      });
    } catch (error) {
      console.error('Error uploading course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='home'>
      <Header />
      <section className='user-profile'>
        <h1 className='heading'>Загрузка курсов</h1>
        <div className='info'>
          <div id='container'>
            <form id='uploadForm' onSubmit={handleSubmit}>
              <h1>Название курса: </h1>
              <input type='text' name='title' id='courseTitle' placeholder='Введите название курса' value={courseData.title} onChange={handleInputChange} required />
              <h1>Описание курса: </h1>
              <input type='text' name='description' id='courseDescription' placeholder='Введите краткое описание курса' value={courseData.description} onChange={handleInputChange} required />
              <h1>Полное описание курса: </h1>
              <input type='text' name='maxDescription' id='courseMaxDescription' placeholder='Введите полное описание курса' value={courseData.maxDescription} onChange={handleInputChange} required />
              <h1>Выберите изображение для курса</h1>
              <input type='file' name='image' id='photoInput' accept='image/*' onChange={handleFileChange} required />
              <button type='submit'>Загрузить</button>
            </form>
            {isLoading && <div className="loading-spinner"></div>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default withAuth(CourseDownload, ['admin']);
