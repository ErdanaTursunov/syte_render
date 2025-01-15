import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { $host } from '../http/axios';



const VideoPlayer = () => {
  const { id } = useParams();
  const [videoBlob, setVideoBlob] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await $host.get(`/videos/${id}`, { responseType: 'blob' }); // Указываем тип ответа как blob
        setVideoBlob(response.data);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!videoBlob) {
    return <div>Loading...</div>;
  }

  return (
    <div className='video' >
      <video width="640" height="360" controls>
        {/* Вставляем видео в тег <video> */}
        <source src={URL.createObjectURL(videoBlob)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
