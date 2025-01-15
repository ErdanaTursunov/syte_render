import React from 'react'
import withAuth from './WithAuth'
import '../App.css'; 
import Courses from './courses';
import Header from './Header';




const Course = () => {
  return (
    <div className="home">
      <Header />
      <Courses />
    </div>
  )
}


export default withAuth(Course,  ['admin'])