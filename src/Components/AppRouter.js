
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ADMIN_ROUTE, CONTACT_ROUTE, COURSE_ROUTE, HOME_ROUTE, SIGNIN_ROUTE, VIDEOS_ROUTE, VIDEO_ROUTE } from '../consts'
import Home from './Home'
import SignIn from './SignIn'
import Course from './Course'
import Video from './Video'
import WatchVideo from './WatchVideo'
import Contact from './Contact'







export const AppRouter = () => {
  return (
       <Routes>
        <Route exact path={SIGNIN_ROUTE} element={<SignIn />} />
        <Route exact path={HOME_ROUTE} element={<Home />} />
        <Route exact path={COURSE_ROUTE} element={<Course />} />
        <Route exact path={VIDEO_ROUTE} element={<Video />} />
        <Route exact path={VIDEOS_ROUTE} element={<WatchVideo />} />
        <Route exact path={CONTACT_ROUTE} element={<Contact />} />
  

        </Routes>
  )
}
