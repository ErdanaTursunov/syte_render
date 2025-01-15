import React, { useState, useEffect } from 'react';
import { $authHost } from '../http/axios';
import Header from './Header';
import withAuth from './WithAuth';

const VideoUpload = () => {
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    courseId: '',
    videoFile: null,
    imageFile: null // Добавлено новое состояние для файла изображения
  });

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of courses
    const fetchCourses = async () => {
      try {
        const response = await $authHost.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData({ ...videoData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setVideoData({ ...videoData, [name]: files[0] });
  };
  
  // Добавлен новый обработчик для выбора файла изображения
  const handleImageFileChange = (e) => {
    const { name, files } = e.target;
    setVideoData({ ...videoData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', videoData.title);
      formData.append('description', videoData.description);
      formData.append('courseId', videoData.courseId);
      formData.append('file', videoData.videoFile);
      formData.append('image', videoData.imageFile); // Добавлено новое поле для изображения

      const response = await $authHost.post('/course/upload', formData);
      console.log(response.data);

      // Clear form after successful upload
      setVideoData({
        title: '',
        description: '',
        courseId: '',
        videoFile: null,
        imageFile: null // Очищаем состояние файла изображения
      });
      setError('');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading video:', error);
      setError('Failed to upload video');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='home'>
      <Header />
      <section className='user-profile'>
        <h1 className='heading'>Загрузка видео</h1>
        <div className='info'>
          <div id='container'>
            <form id='uploadForm' onSubmit={handleSubmit}>
              <h1>Название видео:</h1>
              <input
                type='text'
                name='title'
                id='videoTitle'
                placeholder='Введите название видео'
                value={videoData.title}
                onChange={handleInputChange}
                required
              />
              <h1>Описание курса:</h1>
              <input
                type='text'
                name='description'
                id='videoDescription'
                placeholder='Введите описание видео'
                value={videoData.description}
                onChange={handleInputChange}
                required
              />
              <h1>Выберите видеоурок:</h1>
              <input
                type='file'
                name='videoFile'
                id='videoInput'
                accept='video/*'
                onChange={handleFileChange}
                required
              />
              <h1>Выберите нужный курс:</h1>
              <select
                name='courseId'
                id='choices'
                value={videoData.courseId}
                onChange={handleInputChange}
                required
              >
                <option value=''>Выберите курс</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <h1>Выберите изображение:</h1>
              <input
                type='file'
                name='imageFile'
                id='imageInput'
                accept='image/*'
                onChange={handleImageFileChange} // Обработчик для выбора файла изображения
                required
              />

              <button type='submit' disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Загрузить'}
              </button>
              {error && <p className='error'>{error}</p>}
            </form>
            {isLoading && <div className="loading-spinner"></div>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default withAuth(VideoUpload, ['admin']);
