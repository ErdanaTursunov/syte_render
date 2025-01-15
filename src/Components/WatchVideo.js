import React, { useEffect, useState } from 'react';
import Header from './Header';
import withAuth from './WithAuth';
import VideoPlayer from './AbVideo';
import { $host } from '../http/axios';
import { useParams} from 'react-router-dom';

const WatchVideo = () => {
  const { id } = useParams();
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessondescription, setLessondescription] = useState('');

  useEffect(() => {
    const fetchLessonTitle = async () => {
      try {
        // Отправляем GET-запрос к API для получения данных о видео
        const response = await $host.get(`/videos/${id}/url`);
        // Получаем название урока из ответа и устанавливаем его в состояние
        setLessonTitle(response.data.title);
        setLessondescription(response.data.description);
      } catch (error) {
        console.error('Error fetching lesson title:', error);
      }
    };

    fetchLessonTitle();
  }, []);
  return (
    <div className='home'>
      <div className='.watch-video '>
        <div className='.video-container'>
      <Header />
      <section className="watch-video">
        <div className="video-container">
          <VideoPlayer />
          <h3 className="title">{lessonTitle}</h3> {/* Отображаем название урока */}
          <p className="description">{lessondescription}</p>
        </div>
      </section>
      </div>
      </div>
    </div>
  );
};

export default withAuth(WatchVideo, ['user']);
