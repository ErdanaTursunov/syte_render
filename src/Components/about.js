import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';


const About = () => {
  return (
    <div>
      <section className="about">
        <div className='row'>
          <div className="image">
            <img src="/images/about-img.svg" alt="About" />
          </div>
          <div className="content">
            <h3>Имя Учителя</h3>
            <p>Информация об учителе</p>
            <a href="/course" className="inline-btn">Курсы</a>
          </div>
        </div>
        
        <div className="box-container">
          <div className="box">
            <i> <FontAwesomeIcon icon={faGraduationCap} /></i>
            <div>
              <h3>Опыт работы</h3>
              <p>5 лет</p>
            </div>
          </div>

          <div className="box">
            <i ><FontAwesomeIcon icon={faUserGraduate} /></i>
            <div>
              <h3>Обучено учеников</h3>
              <p>500 учеников</p>
            </div>
          </div>

          <div className="box">
            <i ><FontAwesomeIcon icon={faChalkboardUser} /></i>
            <div>
              <h3>Кол-во курсов</h3>
              <p>10 курсов</p>
            </div>
          </div>

          <div className="box">
            <i ><FontAwesomeIcon icon={faBriefcase} /></i>
            <div>
              <h3>Обратная связь</h3>
              <p>обратная связь 24/7</p>
            </div>
          </div>
        </div>
      </section> 

      <section className="reviews">
        <h1 className="heading">Отзывы студентов</h1>
        <div className="box-container">
          <div className="box">
            <p>Отзыв</p>
            <div className="student">
              <img src="/images/pic-2.jpg" alt="Student 2" />
              <div>
                <h3>Имя</h3>
              </div>
            </div>
          </div>

          <div className="box">
            <p>Отзыв</p>
            <div className="student">
              <img src="/images/pic-3.jpg" alt="Student 3" />
              <div>
                <h3>Имя</h3>
              </div>
            </div>
          </div>

          <div className="box">
            <p>Отзыв</p>
            <div className="student">
              <img src="/images/pic-4.jpg" alt="Student 4" />
              <div>
                <h3>Имя</h3>
              </div>
            </div>
          </div>

          <div className="box">
            <p>Отзыв</p>
            <div className="student">
              <img src="/images/pic-5.jpg" alt="Student 5" />
              <div>
                <h3>Имя</h3>
              </div>
            </div>
          </div>

          <div className="box">
            <p>Отзыв</p>
            <div className="student">
              <img src="/images/pic-6.jpg" alt="Student 6" />
              <div>
                <h3>Имя</h3>
              </div>
            </div>
          </div>

          <div className="box">
            <p>Отзыв</p>
            <div className="student">
              <img src="/images/pic-7.jpg" alt="Student 7" />
              <div>
                <h3>Имя</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
