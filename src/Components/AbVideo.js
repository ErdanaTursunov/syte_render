import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { $host } from '../http/axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoBlob, setVideoBlob] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, [videoRef.current]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await $host.get(`/videos/${id}`, { responseType: 'blob' });
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
    <div className='video'>
      <video
        ref={videoRef}
        width="640"
        height="360"
        controls
        controlsList="nodownload"
      >
        <source src={URL.createObjectURL(videoBlob)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
