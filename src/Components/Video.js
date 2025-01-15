import React from 'react'
import Header from './Header'
import Videos from './Videos'
import withAuth from './WithAuth'
import '../App.css'; 


 const Video = () => {
  return (
    <div className='home'>
       <Header />
      <Videos />
    </div>
  )
}

export default withAuth(Video,  ['user']) ;