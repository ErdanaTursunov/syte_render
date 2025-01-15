import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faLaptopFile } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Redirect, useNavigate } from 'react-router-dom';

const Sidebar = ({ isActive, handleCloseClick }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/signin');
  };

  return (

    <div className={`side-bar ${isActive ? 'active' : ''}`}>
      <div id="close-btn" onClick={handleCloseClick}>
        <i className="fas fa-times"></i>
      </div>
      <div className="profile">
        {isLoggedIn ? (
          <>
            <button className='btn' onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <>
            
          </>
        )}
      </div>
      <nav className="navbar">
        <a href="/admin"><i ><FontAwesomeIcon icon={faQuestion} /></i><span>Главное</span></a>
        <a href="/admin/course"><i ><FontAwesomeIcon icon={faGraduationCap} /></i><span>Курсы</span></a>
        <a href="/admin/contact"><i ><FontAwesomeIcon icon={faHeadset} /></i><span>О Платформе</span></a>
        <a href="/admin/course/download"><i ><FontAwesomeIcon icon={faLaptopFile} /></i><span>Загрузка курсов</span></a>
        <a href="/admin/video/download"><i ><FontAwesomeIcon icon={faVideo} /></i><span>Загрузка видео</span></a>
        <a href="/admin/users"><i ><FontAwesomeIcon icon={faUsers} /></i><span>Пользователи</span></a>
      </nav>
    </div>
  );
};

export default Sidebar;
