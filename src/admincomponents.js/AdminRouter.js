
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CONTACT_ROUTE, COURSE_ROUTE, HOME_ROUTE, VIDEOS_ROUTE, VIDEO_ROUTE, download_course, download_video, users } from '../adminconsts'
import Home from './Home'
import Course from './Course'
import Contact from './Contact'
import Video from './Video'
import WatchVideo from './WatchVideo'
import Coursedownload from './Coursedownload'
import VideoDownload from './VideoDownload'
import UsersDownload from './UsersDownload'







export const AdminRouter = () => {
  return (
       <Routes>
        <Route exact path={HOME_ROUTE} element={<Home />} />
        <Route exact path={COURSE_ROUTE} element={<Course />} />
        <Route exact path={CONTACT_ROUTE} element={<Contact />} />
        <Route exact path={VIDEO_ROUTE} element={<Video />} />
        <Route exact path={VIDEOS_ROUTE} element={<WatchVideo/>} />
        <Route exact path={download_course} element={<Coursedownload/>} />
        <Route exact path={download_video} element={<VideoDownload/>} />
        <Route exact path={users} element={<UsersDownload />} />
        
        </Routes>
  )
}
