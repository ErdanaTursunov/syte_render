import React from 'react';
import Header from './Header';
import '../App.css'; 
import withAuth from './WithAuth';
import About from './about';


const Home = () => {
  return (
    <div className="home">
      <Header />
      <About />
    </div>
  );
};
  export default  withAuth(Home,  ['admin']);