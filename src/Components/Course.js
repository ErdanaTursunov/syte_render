import React from 'react'
import withAuth from './WithAuth'
import Header from './Header'
import '../App.css'; 
import Courses from './courses';


const Course = () => {
  return (
    <div className="home">
      <Header />
      <Courses />
    </div>
  )
}


export default withAuth(Course,  ['user'])