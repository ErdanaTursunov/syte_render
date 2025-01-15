import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar'; // Убедитесь, что путь правильный
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const handleCloseClick = () => {
    setIsSidebarActive(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSidebarActive(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1200) {
      setIsSidebarActive(false);
    }
  }, []);

  useEffect(() => {
    if (isSidebarActive) {
      document.querySelector('.home').classList.add('active');
    } else {
      document.querySelector('.home').classList.remove('active');
    }
  }, [isSidebarActive]);

  return (
    <header className="header">
      <section className="flex">
        <a href="#" className="logo">E-course</a>
        <div className="icons">
       
          <div id="menu-btn" onClick={handleMenuClick}> <FontAwesomeIcon icon={faBars} onClick={handleMenuClick} /></div>
        </div>
      </section>
      <Sidebar isActive={isSidebarActive} handleCloseClick={handleCloseClick} />
    </header> 
  );
};

export default Header;
