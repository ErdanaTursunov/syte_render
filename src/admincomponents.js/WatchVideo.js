import React, { useEffect, useState } from 'react';
import { $authHost} from '../http/axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import VideoPlayer from './AbVideo';
import withAuth from './WithAuth';

const WatchVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLessonTitle = async () => {
      try {
        const response = await $authHost.get(`/videos/${id}/url`);
        setLessonTitle(response.data.title);
        setLessonDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching lesson title:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessonTitle();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить это видео?')) {
      try {
       
        await $authHost.delete(`/videos/${id}`);
        alert('Видео успешно удалено');
        navigate('/admin/course')
      } catch (error) {
        console.error('Error deleting video:', error);
        alert('Ошибка при удалении видео');
      }
    }
  };

  return (
    <div className='home'>
      <Header />
      <section className="watch-video">
        <div className="video-container">
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            <>
              <VideoPlayer />
              <h3 className="title">{lessonTitle}</h3>
              <p className="description">{lessonDescription}</p>
              <button onClick={handleDelete} className="delete-button">Удалить</button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default withAuth(WatchVideo, [ 'admin']);
