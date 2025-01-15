import React from 'react';
import Header from './Header';
import '../App.css'; 
import About from './about';
import withAuth from './WithAuth';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <About />
    </div>
  );
};
  export default  withAuth(Home,  ['user']);