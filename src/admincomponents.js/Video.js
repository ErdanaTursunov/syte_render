import React from 'react'
import withAuth from './WithAuth'
import '../App.css'; 
import Header from './Header';
import Videos from './Videos';


 const Video = () => {
  return (
    <div className='home'>
       <Header />
      <Videos />
    </div>
  )
}

export default withAuth(Video,  ['admin']) ;