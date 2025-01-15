import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { $host } from "../http/axios";

const Videos = () => {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [videoCount, setVideoCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await $host.get(`/courses/${courseId}`);
        setCourses([response.data]); // Обратите внимание на изменение здесь
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await $host.get(`/course/${courseId}`);
        setVideos(response.data);
        setVideoCount(response.data.length); // Обновляем количество видео
      } catch (error) {
        console.error("Error fetching video data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  return (
    <div>
      <section className="course-details">
        <h1 className="heading">Информация о курсе</h1>
        <div className="row">
          <div className="column">
            <div className="thumb">
              {courses.map((course) => (
                <div key={course.id}>
                  {course.image && (
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/images/${course.image}`}
                      alt={course.title}
                    />
                  )}
                </div>
              ))}
              <span>Количество видео: {videoCount}</span>
            </div>
          </div>
          <div className="column">
            <div className="details">
              {courses.map((course) => (
                <div key={course.id}>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <p>{course.maxDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="course-videos">
        <h1 style={{ marginBottom: "10px" }}>Видео курса</h1>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          <div className="box-container">
            {videos.map((video) => (
              <a
                key={video.id}
                href={`/admin/video/${video.id}`}
                className="box"
              >
                <div key={video.id}>
                  {video.imagepath && (
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}${video.imagepath}`}
                      alt={video.title}
                    />
                  )}
                </div>

                <h3>{video.title}</h3>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Videos;
